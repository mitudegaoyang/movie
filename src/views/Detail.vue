<template>
  <div class="nav">
    <router-link to="/">首页</router-link>
  </div>
  <div
    v-wechat-title="
      `${detail.year}-${detail.title}-${detail.category}-电影小站`
    "
    class="detail"
  >
    <div class="info-container">
      <div class="mainpic">
        <a-image
          :width="320"
          :src="detail.img"
          :alt="detail.title"
          fallback="https://s4.ax1x.com/2022/02/17/H5W5QO.png"
        />
      </div>
      <div class="info">
        <p
          v-show="detail.title"
          v-text="detail.title"
          class="info-item title"
        ></p>
        <p v-show="detail.date" class="info-item date">
          {{ dict.date }}
          {{ $dayjs(detail.date).format("YYYY-MM-DD HH:mm:ss") }}
        </p>
        <p v-show="detail.translation" class="info-item translation">
          {{ dict.translation }} {{ detail.translation }}
        </p>
        <p v-show="detail.name" class="info-item name">
          {{ dict.name }} {{ detail.name }}
        </p>
        <p v-show="detail.year" class="info-item year">
          {{ dict.year }} {{ detail.year }}
        </p>
        <p v-show="detail.areas" class="info-item areas">
          {{ dict.areas }} {{ detail.areas }}
        </p>
        <p v-show="detail.category" class="info-item category">
          {{ dict.category }} {{ detail.category }}
        </p>
        <p v-show="detail.language" class="info-item language">
          {{ dict.language }} {{ detail.language }}
        </p>
        <p v-show="detail.caption" class="info-item caption">
          {{ dict.caption }} {{ detail.caption }}
        </p>
        <p v-show="detail.release" class="info-item release">
          {{ dict.release }} {{ detail.release }}
        </p>
        <p v-show="detail.imdb" class="info-item imdb">
          {{ dict.imdb }}
          <a
            v-if="detail.imdb_id"
            href="javascript:;"
            @click="goInfo(detail, 'imdb')"
          >
            {{ detail.imdb }}
          </a>
          <span v-else>{{ detail.imdb }}</span>
          /10 from {{ detail.imdb_user }} users
        </p>
        <p v-show="detail.douban" class="info-item douban">
          {{ dict.douban }}
          <a
            v-if="detail.douban_id"
            href="javascript:;"
            @click="goInfo(detail, 'douban')"
          >
            {{ detail.douban }}
          </a>
          <span v-else>{{ detail.douban }}</span>
          /10 from {{ detail.douban_user }} users
        </p>
        <p v-show="detail.time" class="info-item time">
          {{ dict.time }} {{ detail.time }}分钟
        </p>
      </div>
      <div class="btn">
        <a-button type="primary" class="mr-10">
          <a :href="`${detail.link}`" target="_blank">磁力链接下载</a>
        </a-button>
        <a-button>
          <a :href="`${detail.url}`" target="_blank">原文链接</a></a-button
        >
      </div>
    </div>
    <div class="info-container">
      <div class="info">
        <p v-show="detail.director" class="info-item director">
          {{ dict.director }} {{ detail.director }}
        </p>
        <p v-show="detail.writers" class="info-item writers">
          {{ dict.writers }} {{ detail.writers }}
        </p>
        <p v-show="detail.actor" class="info-item actor">
          {{ dict.actor }} {{ detail.actor }}
        </p>
        <p v-show="detail.starring" class="info-item starring">
          {{ dict.starring }} {{ detail.starring }}
        </p>
        <p v-show="detail.tag" class="info-item tag">
          {{ dict.tag }} {{ detail.tag }}
        </p>
        <p v-show="detail.introduction" class="info-item introduction">
          {{ dict.introduction }} {{ detail.introduction }}
        </p>
      </div>
    </div>
    <!-- {{ detail }} -->
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// import { getMovieDetails } from "@/api/detail";
import movieList from "@/mock/movie";

export default defineComponent({
  name: "Detail",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const id = router.currentRoute.value.params.id;
    const str = localStorage.getItem(id.toString()) || "";
    let detail: any = reactive({});
    const getList = () => {
      movieList.map((movieItem: any) => {
        axios.get(`/data/${movieItem}.json`).then((res) => {
          let { data } = res;
          data.map((item: any) => {
            if (item.id === id) {
              detail.id = item.id;
              detail.title = item.title;
              detail.url = item.url;
              detail.desc = item.desc;
              detail.summary = item.summary;
              detail.link = item.link;
              detail.img = item.img;
              detail.date = item.date;
              detail.translation = item.translation;
              detail.name = item.name;
              detail.year = item.year;
              detail.areas = item.areas;
              detail.category = item.category;
              detail.language = item.language;
              detail.caption = item.caption;
              detail.release = item.release;
              detail.imdb = item.imdb;
              detail.imdb_user = item.imdb_user;
              detail.douban = item.douban;
              detail.douban_user = item.douban_user;
              detail.time = item.time;
              detail.director = item.director;
              detail.writers = item.writers;
              detail.actor = item.actor;
              detail.starring = item.starring;
              detail.tag = item.tag;
              detail.introduction = item.introduction;
              localStorage.setItem(id.toString(), JSON.stringify(detail));
              return;
            }
          });
        });
      });
      // detail = dataSource.find((n: any) => n.id === id);
    };

    // const data = [{}];
    if (str) {
      detail = JSON.parse(str);
    } else {
      getList();
    }
    store.commit("SET_DATA", detail);

    const dict = reactive({
      date: "发布时间",
      translation: "译名",
      name: "片名",
      year: "年代",
      areas: "产地",
      category: "类别",
      language: "语言",
      caption: "字幕",
      release: "上映日期",
      imdb: "IMDb评分",
      douban: "豆瓣评分",
      time: "片长",
      director: "导演",
      writers: "编剧",
      actor: "演员",
      starring: "演员",
      tag: "标签",
      introduction: "简介",
    });

    const goInfo = (record: any, type: string) => {
      if (type === "imdb") {
        window.open("https://www.imdb.com/title/" + record.imdb_id);
      } else {
        window.open("https://movie.douban.com/subject/" + record.douban_id);
      }
    };

    // const getDetail = async () => {
    //   const { data } = await getMovieDetails(id);

    //   detail = data.list;
    //   console.log(detail);
    //   return data;
    // };

    return {
      detail,
      dict,
      goInfo,
    };
  },
});
</script>

<style lang="less" scoped>
.nav {
  background-color: #eef1f4;
  padding: 30px;
  a {
    font-weight: bold;
    color: #42b983;
  }
  a:hover {
    color: #8fcfb1;
    // color: rgba(66, 185, 131, 0.6);
  }
}
.detail {
  min-height: 760px;
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  margin: 0 70px;
  .info-container {
    display: flex;
    .info {
      text-align: left;
      width: 100%;
      padding: 16px 34px;
      .info-item {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 22px;
        margin-bottom: 10px;
        word-wrap: break-word;
      }
      .info-item.title {
        font-size: 26px;
        font-weight: 500;
        line-height: 37px;
        margin-bottom: 20px;
      }
    }
    .btn {
      display: flex;
      justify-content: space-between;
      width: 400px;
      .mr-10 {
        margin-right: 10px;
      }
    }
  }
}
</style>
