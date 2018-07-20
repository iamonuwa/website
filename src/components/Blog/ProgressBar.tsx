import React from 'react';
import styled from 'styled-components';

const ProgressBarWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #f6f6f6;

  > div#progress {
    height: 100%;
    background-color: #00e2c1;
  }
`;

export default class extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    const scrollPosition =
      document.body.scrollTop || document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const footerHeight = 460;
    const progress = (scrollPosition / (windowHeight - footerHeight)) * 100;
    (
      document.getElementById('progress') || { style: { width: 0 } }
    ).style.width = `${progress}%`;
  }

  render() {
    return (
      <ProgressBarWrap>
        <div id={'progress'} />
      </ProgressBarWrap>
    );
  }
}
