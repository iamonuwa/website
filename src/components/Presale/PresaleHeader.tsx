import React from 'react';
import { Col, Row } from 'antd';
import { HeroText } from '@src/Styles';
import { device, size } from '@src/breakpoints';
import styled from 'styled-components';

export const HeroInfo = HeroText.extend`
  color: #000;
`;

export const TextWrapper = styled.div`
  width: 800px;
  @media ${device.mobileS} and (max-width: ${size.mobileL}) {
    padding: 0px 0px;
  }

  @media ${device.mobileL} and (max-width: ${size.tablet}) {
    padding: 0px 0px;
  }

  @media ${device.tablet} and (max-width: ${size.laptop}) {
    padding: 0px 40px;
  }
`;

class PresaleHeader extends React.Component {
  render() {
    return (
      <section>
        <Row type="flex" className="hero" align="middle">
          <Col xs={24} sm={24} md={24} lg={24}>
            <HeroInfo>Presale</HeroInfo>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24}>
            <TextWrapper>
              <b>
                The exact date and details of the Market Protocol presale have
                not yet been announced.
              </b>
            </TextWrapper>
            <TextWrapper>
              Please fill out this form if you are interested in participating
              in the Market Protocol presale and want to be updated as more
              details are announced.
            </TextWrapper>
          </Col>
        </Row>
      </section>
    );
  }
}

export default PresaleHeader;
