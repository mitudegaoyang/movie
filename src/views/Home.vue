<template>
  <div class="home">
    <div class="banner">
      <div class="logo"></div>
    </div>
    <div class="table">
      <a-config-provider :locale="zhCN">
        <a-table
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1300 }"
          :pagination="{ position: ['bottomCenter'] }"
          row-key="id"
        >
          <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
              <span style="color: #1890ff">姓名</span>
            </template>
          </template>
          <template
            #customFilterDropdown="{
              setSelectedKeys,
              selectedKeys,
              confirm,
              clearFilters,
              column,
            }"
          >
            <div style="padding: 8px">
              <a-input
                ref="searchInput"
                :placeholder="`筛选 ${column.title}`"
                :value="selectedKeys[0]"
                style="width: 188px; margin-bottom: 8px; display: block"
                @change="
                  (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
                "
                @pressEnter="
                  handleSearch(selectedKeys, confirm, column.dataIndex)
                "
              />
              <a-button
                type="primary"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
              >
                <template #icon><SearchOutlined /></template>
                搜索
              </a-button>
              <a-button
                size="small"
                style="width: 90px"
                @click="handleReset(clearFilters)"
              >
                重置
              </a-button>
            </div>
          </template>
          <template #customFilterIcon="{ filtered }">
            <search-outlined
              :style="{ color: filtered ? '#108ee9' : undefined }"
            />
          </template>
          <template #bodyCell="{ text, column, record }">
            <span v-if="searchText && searchedColumn === column.dataIndex">
              <template v-if="column.key !== 'title'">
                <!-- {{ text.toString().split(searchText)[0] }}
                  <mark class="highlight">
                    {{ searchText }}
                  </mark>
                  {{ text.toString().split(searchText)[1] }} -->
                <span
                  v-for="(fragment, i) in formatTagName(text, searchText)"
                  :key="i"
                >
                  <span v-if="searchText === fragment" class="highlight">
                    {{ fragment }}
                  </span>
                  <template v-else>{{ fragment }}</template>
                </span>
              </template>
              <template v-else>
                <a href="javascript:;" @click="goDetail(record)">
                  <!-- {{ text.toString().split(searchText)[0] }}
              <mark class="highlight">
                {{ searchText }}
              </mark>
              {{ text.toString().split(searchText)[1] }} -->
                  <span
                    v-for="(fragment, i) in formatTagName(text, searchText)"
                    :key="i"
                  >
                    <span v-if="searchText === fragment" class="highlight">
                      {{ fragment }}
                    </span>
                    <template v-else>{{ fragment }}</template>
                  </span>
                </a>
              </template>
            </span>
            <template v-else-if="column.key === 'title'">
              <a href="javascript:;" @click="goDetail(record)">
                {{ record.title }}
              </a>
            </template>
            <template v-else-if="column.key === 'img'">
              <a-image
                v-if="record.img"
                :width="50"
                :src="record.img"
                :alt="record.title"
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
              />
              <a-image
                v-else
                :width="50"
                :src="record.img2"
                :alt="record.title"
                fallback="data:image/png;base64,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"
              />
            </template>
            <template v-else-if="column.key !== 'action'">
              <span>
                {{ text ? text : "-" }}
              </span>
            </template>
            <template v-if="column.key === 'action'">
              <!-- <a-divider type="vertical" /> -->
              <!-- <br /> -->
              <!-- <a-button type="link" @click="goDetail(record)">查看详情</a-button> -->
              <!-- <a-divider type="vertical" /> -->
              <div style="margin-bottom: 10px">
                <a-button type="primary">
                  <a :href="`${record.link}`" target="_blank">下载链接</a>
                </a-button>
              </div>
              <a-button>
                <a :href="`${record.url}`" target="_blank">原始链接</a>
              </a-button>
            </template>
          </template>
        </a-table>
      </a-config-provider>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
// import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { SearchOutlined } from "@ant-design/icons-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";

import data from "../mock/movie";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    SearchOutlined,
    // HelloWorld,
  },
  setup() {
    // const router = useRouter();
    const store = useStore();

    const state = reactive({
      searchText: "",
      searchedColumn: "",
    });

    const searchInput = ref();

    const columns = [
      {
        title: "海报",
        dataIndex: "img",
        key: "img",
        width: 100,
      },
      {
        title: "标题",
        dataIndex: "title",
        key: "title",
        width: 400,
        customFilterDropdown: true,
        onFilter: (value: string, record: any) =>
          record.title.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: any) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
      },
      {
        title: "IMDb",
        dataIndex: "imdb",
        key: "imdb",
        width: 100,
        customFilterDropdown: true,
        onFilter: (value: string, record: any) =>
          record.imdb.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: any) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
        sorter: {
          compare: (a: any, b: any) => a.imdb - b.imdb,
          multiple: 3,
        },
      },
      {
        title: "IMDb人数",
        dataIndex: "imdb_user",
        key: "imdb_user",
        width: 130,
        customFilterDropdown: true,
        onFilter: (value: string, record: any) =>
          record.imdb_user
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: any) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
        sorter: {
          compare: (a: any, b: any) => a.imdb_user - b.imdb_user,
          multiple: 3,
        },
      },
      {
        title: "豆瓣",
        dataIndex: "douban",
        key: "douban",
        width: 100,
        customFilterDropdown: true,
        onFilter: (value: string, record: any) =>
          record.douban.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: any) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
        sorter: {
          compare: (a: any, b: any) => a.douban - b.douban,
          multiple: 3,
        },
      },
      {
        title: "豆瓣人数",
        dataIndex: "douban_user",
        key: "douban_user",
        width: 120,
        customFilterDropdown: true,
        onFilter: (value: string, record: any) =>
          record.douban_user
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: any) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
        sorter: {
          compare: (a: any, b: any) => a.douban_user - b.douban_user,
          multiple: 3,
        },
      },
      {
        title: "片长",
        dataIndex: "time",
        key: "time",
        width: 100,
        customFilterDropdown: true,
        onFilter: (value: string, record: any) =>
          record.time.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: any) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
        sorter: {
          compare: (a: any, b: any) => a.time - b.time,
          multiple: 3,
        },
      },
      {
        title: "类型",
        dataIndex: "category",
        key: "category",
        width: 200,
        customFilterDropdown: true,
        onFilter: (value: string, record: any) =>
          record.category
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: any) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
      },
      {
        title: "年份",
        dataIndex: "year",
        key: "year",
        width: 100,
        customFilterDropdown: true,
        onFilter: (value: string, record: any) =>
          record.year.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: any) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
        sorter: {
          compare: (a: any, b: any) => a.year - b.year,
          multiple: 3,
        },
      },
      {
        title: "产地",
        dataIndex: "areas",
        key: "areas",
        width: 200,
        customFilterDropdown: true,
        onFilter: (value: string, record: any) =>
          record.areas.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: any) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
      },
      {
        title: "语言",
        dataIndex: "language",
        key: "language",
        width: 150,
        customFilterDropdown: true,
        onFilter: (value: string, record: any) =>
          record.language
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: any) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
      },
      {
        title: "操作",
        key: "action",
        fixed: "right",
        width: 150,
      },
    ];

    const handleSearch = (
      selectedKeys: string,
      confirm: any,
      dataIndex: string
    ) => {
      confirm();
      state.searchText = selectedKeys[0];
      state.searchedColumn = dataIndex;
    };

    const handleReset = (clearFilters: any) => {
      clearFilters();
      state.searchText = "";
    };

    const goDetail = (record: any) => {
      store.commit("SET_DATA", record);
      window.open("/detail/" + record.id);
      // router.push({ name: "Detail", params: record });
    };

    /**
     * @description 处理行业领域数据
     * @param { string }  text 行业领域标签名
     * @param { string }  search 关键词
     * @returns { array }
     */
    const formatTagName = (text: string, search: string) => {
      let re = new RegExp("(" + search + ")", "g");
      return text.split(re).filter((item) => item);
    };

    return {
      zhCN,
      data,
      columns,
      handleSearch,
      handleReset,
      searchInput,
      goDetail,
      formatTagName,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less" scoped>
.highlight {
  color: #f79433;
}
.home {
  .banner {
    background: linear-gradient(181deg, #fed307, #ffbc0e);
    font-size: 90px;
    font-family: YouSheBiaoTiHei;
    color: #ffffff;
    line-height: 117px;
    padding-bottom: 55px;
    .logo {
      margin: 0 auto;
      width: 550px;
      height: 129px;
      background: url(../assets/banner.png) no-repeat center center;
    }
  }
  .table {
    position: relative;
    top: -55px;
    padding: 0 70px;
  }
}
</style>
