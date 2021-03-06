import { useHistory, useParams } from "react-router-dom";
import {
  deletePost,
  getPost,
  resetPost,
  resetPostStatus,
  selectPost,
  selectPostById,
  selectPostStatus,
} from "../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ArticleBlock, Main, Wrapper } from "../components/Layout";
import { Image } from "../components/Image";
import { H1, H5 } from "../components/Text";
import { Button } from "../components/Button";
import { ArrowLink } from "../components/Link";
import { selectUserStatus } from "../redux/reducers/userReducer";
import { Markdown } from "../components/Markdown";

export default function ArticlePage() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const postById = useSelector((state) => selectPostById(state, id));
  const postByFetch = useSelector(selectPost);
  const postStatus = useSelector(selectPostStatus);
  const userStatus = useSelector(selectUserStatus);

  useEffect(() => {
    if (!postById && postStatus === "ready") dispatch(getPost(id));
  }, [postById, postStatus, dispatch, id]);

  const post = postById || postByFetch;

  const handleDelete = () => {
    if (userStatus === "succeeded") {
      dispatch(deletePost(id));
    }
  };

  useEffect(() => {
    if (postStatus === "failed" || (postStatus === "succeeded" && !post)) {
      if (
        history.location.pathname !== "post" ||
        history.location.pathname !== "edit"
      )
        history.goBack();
      history.push("/list");
    }
  }, [postStatus, post, history]);

  useEffect(() => {
    return () => {
      if (postStatus === "succeeded") {
        dispatch(resetPostStatus());
        dispatch(resetPost());
      }
    };
  }, [dispatch, postStatus]);

  return (
    <Main>
      <Wrapper>
        {post && (
          <ArticleBlock>
            <H5 $grey500>{post.Category.text}</H5>
            <H1 className={"title"}>{post.title}</H1>
            <H5 $grey500 className={"info"}>
              {new Date(post.updatedAt).toLocaleString()}
            </H5>
            <div className={"banner"}>
              <Image $width={"max"} $height={"500"} $image={post.image} />
            </div>
            <Wrapper $medium className={"content"}>
              <Markdown source={post.body} />
              {userStatus === "succeeded" && (
                <div className="group">
                  <Button $alert onClick={handleDelete}>
                    刪除
                  </Button>
                  <ArrowLink to={`/edit/${post.id}`} label={"編輯"} />
                </div>
              )}
            </Wrapper>
          </ArticleBlock>
        )}
      </Wrapper>
    </Main>
  );
}
