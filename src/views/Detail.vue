<template>
  <div class="nav">
    <router-link to="/">首页</router-link>
  </div>
  <div class="detail">
    <div class="info-container">
      <div class="mainpic">
        <a-image
          v-if="detail.img"
          :width="320"
          :src="detail.img"
          :alt="detail.title"
          fallback="https://s4.ax1x.com/2022/02/17/H5W5QO.png"
        />
        <a-image
          v-else
          :width="320"
          :src="detail.img2"
          :alt="detail.title"
          fallback="https://s4.ax1x.com/2022/02/17/H5W5QO.png"
        />
      </div>
      <div class="info">
        <p v-show="detail.title" class="info-item title">{{ detail.title }}</p>
        <p v-show="detail.date" class="info-item date">
          发布时间 {{ $dayjs(detail.date).format("YYYY-MM-DD HH:mm:ss") }}
        </p>
        <p v-show="detail.translation" class="info-item translation">
          译名 {{ detail.translation }}
        </p>
        <p v-show="detail.name" class="info-item name">
          片名 {{ detail.name }}
        </p>
        <p v-show="detail.year" class="info-item year">
          年代 {{ detail.year }}
        </p>
        <p v-show="detail.areas" class="info-item areas">
          产地 {{ detail.areas }}
        </p>
        <p v-show="detail.category" class="info-item category">
          类别 {{ detail.category }}
        </p>
        <p v-show="detail.language" class="info-item language">
          语言 {{ detail.language }}
        </p>
        <p v-show="detail.caption" class="info-item caption">
          字幕 {{ detail.caption }}
        </p>
        <p v-show="detail.release" class="info-item release">
          上映日期 {{ detail.release }}
        </p>
        <p v-show="detail.imdb" class="info-item imdb">
          IMDb评分 {{ detail.imdb }}/10 from {{ detail.imdb_user }} users
        </p>
        <p v-show="detail.douban" class="info-item douban">
          豆瓣评分 {{ detail.douban }}/10 from {{ detail.douban_user }} users
        </p>
        <p v-show="detail.time" class="info-item time">
          片长 {{ detail.time }}分钟
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
          导演 {{ detail.director }}
        </p>
        <p v-show="detail.writers" class="info-item writers">
          编剧 {{ detail.writers }}
        </p>
        <p v-show="detail.actor" class="info-item actor">
          演员 {{ detail.actor }}
        </p>
        <p v-show="detail.starring" class="info-item starring">
          演员 {{ detail.starring }}
        </p>
        <p v-show="detail.tag" class="info-item tag">标签 {{ detail.tag }}</p>
        <p v-show="detail.introduction" class="info-item introduction">
          简介 {{ detail.introduction }}
        </p>
      </div>
    </div>
    <!-- {{ detail }} -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// import { getMovieDetails } from "@/api/detail";
import datas from "../mock/movie";

export default defineComponent({
  name: "Detail",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const id = router.currentRoute.value.params.id;
    const data = datas;
    let detail = data.find((n: any) => n.id === id);
    store.commit("SET_DATA", detail);

    // const getDetail = async () => {
    //   const { data } = await getMovieDetails(id);

    //   detail = data.list;
    //   console.log(detail);
    //   return data;
    // };

    return {
      data,
      detail,
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
