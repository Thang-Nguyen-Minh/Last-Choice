import { useGetPostsQuery, useToggleLikeMutation } from '../../services/apiSlice'

function Bai7Optimistic() {
  const { data = [], isLoading } = useGetPostsQuery()
  const [toggleLike, { isLoading: isMutating }] = useToggleLikeMutation()
  const post = data[0]

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 7 - Optimistic Update</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Like bài viết tức thì</h3>

        {isLoading || !post ? (
          <p className="mt-5 text-sm text-slate-500">Đang tải bài viết...</p>
        ) : (
          <article className="mt-5 rounded-lg border border-slate-200 p-5">
            <h4 className="text-lg font-bold text-slate-950">{post.title}</h4>
            <p className="mt-2 text-sm text-slate-500">Server giả lập chậm, nhưng UI đổi trạng thái ngay khi click.</p>
            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => void toggleLike({ postId: post.id })}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                  post.liked ? 'bg-emerald-700' : 'bg-slate-700'
                }`}
              >
                {post.liked ? 'Đã thích' : 'Thích'}
              </button>
              <button
                type="button"
                onClick={() => void toggleLike({ postId: post.id, shouldFail: true })}
                className="rounded-lg border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700"
              >
                Like lỗi để rollback
              </button>
              <span className="text-sm text-slate-600">{post.likes} lượt thích</span>
              {isMutating && <span className="text-xs font-semibold text-sky-700">Đang đồng bộ server...</span>}
            </div>
          </article>
        )}
      </div>

      <aside className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-950">
        <h4 className="font-bold">onQueryStarted</h4>
        <p className="mt-2">Mutation gọi `apiSlice.util.updateQueryData` để đổi cache `getPosts` ngay lập tức.</p>
        <p className="mt-3">Nếu `queryFulfilled` fail, patch gọi `undo()` để rollback cache về trạng thái trước đó.</p>
      </aside>
    </section>
  )
}

export default Bai7Optimistic
