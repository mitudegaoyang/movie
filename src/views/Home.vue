<template>
  <div class="home">
    <div class="banner">
      <div class="logo"></div>
    </div>
    <div v-wechat-title="'电影小站'" class="table">
      <a-config-provider :locale="zhCN">
        <a-table
          :columns="columns"
          :data-source="data.dataSource"
          :scroll="{ x: 1300, y: 700 }"
          :pagination="pagination"
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
                  (e:any) => setSelectedKeys(e.target.value ? [e.target.value] : [])
                "
                @pressEnter="handleSearch(column, selectedKeys, confirm)"
              />
              <a-button
                type="primary"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="handleSearch(column, selectedKeys, confirm)"
              >
                <template #icon><SearchOutlined /></template>
                搜索
              </a-button>
              <a-button
                size="small"
                style="width: 90px"
                @click="handleReset(column, clearFilters)"
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
            <span v-if="column.searchText">
              <template v-if="column.key === 'title'">
                <a href="javascript:;" @click="goDetail(record)">
                  <!-- {{ text.toString().split(searchText)[0] }}
                    <mark class="highlight">
                      {{ searchText }}
                    </mark>
                    {{ text.toString().split(searchText)[1] }} -->
                  <span
                    v-for="(fragment, i) in formatTagName(
                      text,
                      column.searchText
                    )"
                    :key="i"
                  >
                    <span
                      v-if="column.searchText === fragment"
                      class="highlight"
                    >
                      {{ fragment }}
                    </span>
                    <template v-else>{{ fragment }}</template>
                  </span>
                </a>
              </template>
              <template
                v-else-if="
                  (column.key === 'imdb' || column.key === 'douban') &&
                  record[column.key + '_id']
                "
              >
                <a href="javascript:;" @click="goInfo(record, column.key)">
                  <span
                    v-for="(fragment, i) in formatTagName(
                      text,
                      column.searchText
                    )"
                    :key="i"
                  >
                    <span
                      v-if="column.searchText === fragment"
                      class="highlight"
                    >
                      {{ fragment }}
                    </span>
                    <template v-else>{{ fragment }}</template>
                  </span>
                </a>
              </template>
              <template v-else>
                <!-- {{ text.toString().split(searchText)[0] }}
                  <mark class="highlight">
                    {{ searchText }}
                  </mark>
                  {{ text.toString().split(searchText)[1] }} -->
                <span
                  v-for="(fragment, i) in formatTagName(
                    text,
                    column.searchText
                  )"
                  :key="i"
                >
                  <span v-if="column.searchText === fragment" class="highlight">
                    {{ fragment }}
                  </span>
                  <template v-else>{{ fragment }}</template>
                </span>
              </template>
            </span>
            <template v-else-if="column.key === 'title'">
              <a href="javascript:;" @click="goDetail(record)">
                {{ record.title }}
              </a>
            </template>
            <template v-else-if="column.key === 'img'">
              <div class="img-container">
                <a-image
                  :width="50"
                  :src="record.img"
                  :alt="record.title"
                  fallback="https://s4.ax1x.com/2022/02/17/H5W5QO.png"
                />
              </div>
            </template>
            <template
              v-else-if="column.key === 'imdb' || column.key === 'douban'"
            >
              <a
                v-if="record[column.key + '_id']"
                href="javascript:;"
                @click="goInfo(record, column.key)"
              >
                {{ text ? text : "-" }}
              </a>
              <span v-else>{{ text ? text : "-" }}</span>
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
              <a :href="`${record.link}`" title="下载链接" target="_blank">
                <span class="iconfont movie-icon-download"></span>
              </a>
              <a :href="`${record.url}`" title="原始链接" target="_blank">
                <span class="iconfont movie-icon-link"></span>
              </a>
              <a @click="collect(record.id)" title="收藏" target="_blank">
                <span
                  :class="[
                    'iconfont',
                    'movie-icon-collect',
                    { collect: collectHistory.indexOf(record.id) > -1 },
                  ]"
                ></span>
              </a>
            </template>
          </template>
        </a-table>
      </a-config-provider>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
// import { useRouter } from "vue-router";
import movieList from "@/mock/movie";
import { SearchOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import axios from "axios";
import _ from "lodash";
import { useStore } from "vuex";
import { searchInput, TFDATA } from "./config/tfConfig";
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
    let data: any = reactive({
      dataSource: [],
    });
    // let dataSourceAll: any = reactive([]);

    const state = reactive({
      collectHistory:
        localStorage.getItem("collectHistory")?.trim().split(",") || [],
    });

    // 数据
    const columns = TFDATA;

    const pagination = {
      defaultPageSize: 25,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ["25", "50", "75", "100"],
      showTotal: (total: number) => `总数${total}`,
      position: ["bottomCenter"],
    };

    const handleSearch = (column: any, selectedKeys: string, confirm: any) => {
      confirm();
      column.searchText = selectedKeys[0];
    };

    const handleReset = (column: any, clearFilters: any) => {
      clearFilters();
      column.searchText = "";
    };

    const goDetail = (record: any) => {
      store.commit("SET_DATA", record);
      localStorage.setItem(record.id, JSON.stringify(record));
      window.open("/detail/" + record.id);
      // router.push({ name: "Detail", params: record });
    };

    const goInfo = (record: any, type: string) => {
      if (type === "imdb") {
        window.open("https://www.imdb.com/title/" + record.imdb_id);
      } else {
        window.open("https://movie.douban.com/subject/" + record.douban_id);
      }
    };

    const getList = () => {
      let num = 0;
      movieList.map((movieItem: any) => {
        axios.get(`/data/${movieItem}.json`).then((res) => {
          let { data: datas } = res;
          datas.map((item: any) => {
            data.dataSource.push(item);
          });
          num++;
          if (num === movieList.length) {
            data.dataSource = _.orderBy(data.dataSource, ["id"], ["desc"]);
            message.success("请求完毕");
          }
        });
      });
    };

    const collect = (id: string) => {
      let num = state.collectHistory.indexOf(id);
      if (num > -1) {
        state.collectHistory.splice(num, 1);
      } else {
        state.collectHistory = [...new Set([...state.collectHistory, ...[id]])];
      }
      if (state.collectHistory.length > 0) {
        localStorage.setItem(
          "collectHistory",
          state.collectHistory
            .filter(function (s) {
              return s && s.trim();
            })
            .toString()
        );
      } else {
        localStorage.removeItem("collectHistory");
      }
    };

    /**
     * @description 处理搜索高亮
     * @param { string }  text 字段内容
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
      pagination,
      handleSearch,
      handleReset,
      searchInput,
      goDetail,
      goInfo,
      formatTagName,
      collect,
      getList,
      ...toRefs(state),
    };
  },
  created() {
    this.getList();
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
      background: url(https://s1.ax1x.com/2022/08/23/vc1llD.png) no-repeat
        center center;
    }
  }
  .table {
    position: relative;
    top: -55px;
    padding: 0 70px;
    .iconfont {
      font-size: 18px;
      transition: all 0.3s linear;
      margin-right: 10px;
    }
    .iconfont:hover {
      color: #fed307;
    }
    .collect {
      color: #fed307;
    }
    .img-container {
      min-height: 75px;
    }
  }
}
</style>
