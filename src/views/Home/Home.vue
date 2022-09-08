<template>
  <div class="home-container">
    <van-nav-bar title="头条" fixed />
    <div class="ArticleContainer">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        :disabled="finished"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <ArticleInfo
            v-for="item in artlist"
            :key="item.id"
            :title="item.title"
            :author="item.aut_name"
            :cmtCount="item.comm_count"
            :time="item.pubdate"
            :cover="item.cover"
          ></ArticleInfo>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getArticleListAPI } from '@/api/articleAPI.js'
import ArticleInfo from '@/components/article/ArticleInfo.vue'
export default {
  name: 'Home',
  data() {
    return {
      page: 1,
      limit: 10,
      artlist: [],
      loading: true,
      finished: false,
      isLoading: false,
    }
  },
  created() {
    this.initArticleList()
  },
  methods: {
    async initArticleList(isRefresh) {
      const { data: res } = await getArticleListAPI(this.page, this.limit)
      if (isRefresh) {
        this.artlist = [...res, ...this.artlist]
      } else {
        this.artlist = [...this.artlist, ...res]
        this.loading = false
      }

      if (res.length === 0) {
        this.finished = true
      }
    },
    onLoad() {
      this.page++
      this.initArticleList()
    },
    onRefresh() {
      this.page++
      this.initArticleList(true)
      this.isLoading = false
    },
  },
  components: { ArticleInfo },
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px, 0, 50px, 0;
}

.van-nav-bar {
  background-color: skyblue;
}

/deep/ .van-nav-bar__title {
  color: white;
}
// /deep/.van-cell__title:first-child {
//   padding-top: 46px;
// }
// /deep/.van-cell {
//   padding: 0;
// }
.ArticleContainer {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>
