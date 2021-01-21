import {
  Block,
  Main,
  Section,
  Wrapper,
  ScrollContainer,
  BetweenBlock,
  Container,
} from "../components/Layout";
import { useSelector } from "react-redux";
import { selectPosts } from "../redux/reducers/postReducer";
import { H1, H3, H4 } from "../components/Text";
import { ArrowLink } from "../components/Link";
import { Card, ImageCard } from "../components/Card";
import { defaultImage } from "../constants/variable";

export default function HomePage() {
  const posts = useSelector(selectPosts);

  return (
    <Main>
      <Wrapper>
        <H1>嗨！</H1>
        <H1>我是何宇涵</H1>
        <H1>歡迎來到我的部落格</H1>
      </Wrapper>
      <Section>
        <ScrollContainer as="ul">
          {posts &&
            posts
              .slice(3, 10)
              .map((post) => (
                <ImageCard
                  as="li"
                  key={post.id}
                  to={`/article-${post.id}`}
                  post={post}
                  $square={"40vmax"}
                  $image={defaultImage}
                />
              ))}
        </ScrollContainer>
      </Section>
      <Wrapper>
        <Section>
          <Container>
            <Block>
              <H3>
                前端工程師 Frontend Developer
                <br />
                Simple but profound.
              </H3>
              <ArrowLink
                to={"/about"}
                className={"link"}
                label={"我想了解更多"}
                $hide
              />
            </Block>
            <Block>
              <H4 as="p" $grey700>
                使用 React 與 Redux 建立網站，喜歡將網站的重複元素拆解成多個
                Components。
                <br />
                另外也能使用 Node.js 與 Express 建構後端，部屬於 AWS，並使用
                Nginx 反向代理。
              </H4>
            </Block>
          </Container>
        </Section>
        <Section>
          <BetweenBlock>
            <H3 $grey500>最新文章</H3>
            <ArrowLink to={"/list"} label={"看看所有文章"} />
          </BetweenBlock>
          <Container as="ul">
            {posts &&
              posts
                .slice(0, 3)
                .map((post) => (
                  <Card
                    as="li"
                    key={post.id}
                    to={`/article-${post.id}`}
                    post={post}
                    $width={"32%"}
                    $image={defaultImage}
                  />
                ))}
          </Container>
        </Section>
      </Wrapper>
    </Main>
  );
}
