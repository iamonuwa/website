import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import Dotdotdot from 'react-dotdotdot';
import showdown from 'showdown';
import { History } from 'history';
import { device } from '@src/breakpoints';

import SocialLinks from './SocialLinks';

const converter = new showdown.Converter();

const RootWrap = styled.div`
  width: 100%;
  margin-bottom: 24px;
  padding: 0 12px;

  @media ${device.mobileS} and (max-width: 767px) {
    width: 100%;
    padding: 0;
  }

  > #root {
    background: #ffffff;
    box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding: 30px;
    width: 100%;
    transition: all 300ms;

    :hover {
      box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.15);
    }

    #blogStats {
      #blogStatsCategory {
        background: #181e26;
        color: #ffffff;
        display: inline-block;
        font-size: 10px;
        line-height: 12px;
        padding: 4px 10px;
        text-transform: uppercase;
        vertical-align: top;
        margin-right: 19px;
      }

      #blogStatsTime {
        color: #8b8b8b;
        display: inline-block;
        font-size: 14px;
        line-height: 20px;
        vertical-align: top;
      }
    }

    #blogImage {
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
      border: none;
      height: 132px;
      margin: -30px 0 30px -30px;
      width: calc(100% + 60px);
    }

    #blogTitle {
      font-weight: bold;
      margin-top: 12px;
      color: #000;
    }

    #blogContent {
      color: #646469;
      margin-top: 10px;
      margin-bottom: 38px;
    }

    #blogActions {
      margin-top: auto;

      #blogLink {
        color: #00e2c1;
        display: inline-block;
        line-height: 30px;

        #arrow-container {
          background: #00e2c1;
          border-radius: 100%;
          color: white;
          display: inline-block;
          height: 16px;
          line-height: 16px;
          margin-left: 9px;
          margin-top: 8px;
          text-align: center;
          vertical-align: top;
          width: 16px;

          #arrow {
            margin-top: -1px;
            position: absolute;
            margin-left: -2px;
          }
        }
      }

      #socialLinksWrapper {
        float: right;
      }
    }
  }
`;

interface Post {
  data: {
    title: string;
    author: string;
    category: string;
    published_at: string;
    medium_link: string;
    thumbnail: string;
    slug: string;
  };
  content: string;
}

interface PostPreviewProps {
  history: History;
  featured?: boolean;
  post: Post;
}

class PostPreview extends React.Component<PostPreviewProps> {
  static createMarkup(body: object, markup: HTMLElement) {
    const content = [];
    const sibling = body.firstElementChild.nextElementSibling;
    const textLength = 177;
    content.push(markup);

    if (markup.textContent.length <= textLength) {
      if (sibling.innerText.length >= textLength) {
        sibling.innerText = sibling.innerText.substring(0, textLength) + '...';
      } else {
        sibling.innerText = sibling.innerText + '...';
      }

      content.push(sibling);
    } else {
      markup.textContent = markup.textContent.substring(0, textLength) + '...';
    }

    return content.length > 1
      ? content[0].outerHTML + content[1].outerHTML
      : content[0].outerHTML;
  }

  render() {
    const { post, featured, history } = this.props;

    if (!post) {
      return null;
    }

    const parser = new DOMParser();
    const htmlString = converter.makeHtml(post.content);
    const html = parser.parseFromString(htmlString, 'text/html');
    const intro = html.body.firstElementChild;

    const markup = PostPreview.createMarkup(html.body, intro as HTMLElement);

    return (
      <RootWrap onClick={() => history.push(`/blog/post/${post.data.slug}`)}>
        <div id="root">
          <div
            id="blogImage"
            style={{
              backgroundImage: `url(${post.data.thumbnail})`,
              height: featured ? '280px' : '132px'
            }}
          />
          <div id="blogStats">
            <div id="blogStatsCategory">{post.data.category}</div>
            <div id="blogStatsTime">
              <Moment format={'MMMM D, YYYY'}>{post.data.published_at}</Moment>
            </div>
          </div>
          <div
            id="blogTitle"
            style={{
              fontSize: featured ? '28px' : '21px',
              lineHeight: featured ? '33px' : '29px'
            }}
          >
            <Dotdotdot clamp={3}>{post.data.title}</Dotdotdot>
          </div>
          <div
            style={{
              fontSize: featured ? '18px' : '14px',
              lineHeight: featured ? '24px' : '20px'
            }}
            id="blogContent"
          >
            <div dangerouslySetInnerHTML={{ __html: markup }} />
          </div>
          <div id="blogActions">
            <div id="blogLink">
              Continue Reading{' '}
              <div id="arrow-container">
                <span id="arrow">›</span>
              </div>
            </div>
            <div id="socialLinksWrapper">
              <SocialLinks slug={post.data.slug} />
            </div>
          </div>
        </div>
      </RootWrap>
    );
  }
}

export default PostPreview;
