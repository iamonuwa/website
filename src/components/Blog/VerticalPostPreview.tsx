import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import Markdown from 'react-markdown';
import { History } from 'history';

import { size } from '@src/breakpoints';
import { cropContent } from '@helpers/cropContent';

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: #a5a5a8;
  font-size: 0.7rem;
  justify-content: space-between;
  padding: 20px;
`;
const Text = styled.div`
  text-align: left;
  color: #646469;
  padding: 0 20px;
  font-size: 0.8rem;
`;
const Bold = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  color: #000;
  margin-bottom: 15px;
  padding: 0 20px;
  text-align: left;
`;
const PostItemContainer = styled.div`
  width: 32%
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0 2px 14px 0 rgba(0,0,0,0.05);
  transition: all 300ms;
  
  :hover {
    box-shadow: 0 15px 30px 0 rgba(0,0,0,0.15);
  }
  @media screen and (max-width: ${size.tabletL}) {
    width: 48%;
    margin-bottom: 20px;
  }
  @media screen and (max-width: ${size.mobileL}) {
    width: 100%;
  }
`;
const PostItemImage = styled.img`
  width: 100%;
`;
const Cropper = styled.div`
  width: 100%
  height: 160px;
  overflow: hidden;
`;
const CategoryContainer = styled.div`
  font-size: 0.8rem;
  color: #fff;
  background-color: #000;
  padding: 1px 4px 1px 4px;
  margin-right: 10px;
`;

interface Post {
  data: {
    title: string;
    author: string;
    category: string;
    published_at: string;
    thumbnail: string;
    slug: string;
  };
  content: string;
}

interface Props {
  history: History;
  post: Post;
}

class VerticalPostPreview extends React.Component<Props> {
  render() {
    const { history, post } = this.props;

    if (!post) {
      return null;
    }

    return (
      <PostItemContainer
        onClick={() => history.push(`/blog/post/${post.data.slug}`)}
      >
        <Cropper>
          <PostItemImage src={post.data.thumbnail} />
        </Cropper>
        <RowContainer>
          <CategoryContainer style={{ fontSize: '0.6rem' }}>
            {post.data.category.toUpperCase()} {''}
          </CategoryContainer>
          <Moment format={'MMMM Do, YYYY'}>{post.data.published_at}</Moment>
        </RowContainer>
        <Bold>{post.data.title}</Bold>
        <Text>
          <Markdown source={cropContent(post.content, 20)} escapeHtml={false} />
        </Text>
      </PostItemContainer>
    );
  }
}

export default VerticalPostPreview;
