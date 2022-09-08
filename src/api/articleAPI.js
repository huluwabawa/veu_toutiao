//文章相关的api

import requset from '@/utils/request'
export const getArticleListAPI = function (_page, _limit) {
  return requset.get('/articles', {
    params: {
      _page,
      _limit,
    },
  })
}
