import React from 'react';
import { Button, Col, Layout, Row } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-static';
//
const { Footer } = Layout;
import logoImg from '@images/logo_light.svg';
import telegram from '@images/telegram.svg';
import twitter from '@images/twitter.svg';
import medium from '@images/medium.svg';
import github from '@images/github.svg';
import youtube from '@images/youtube.svg';
import { device } from '@src/breakpoints';

const AboutMarketText = styled.div`
  margin-top: 35px;

  @media ${device.tablet} {
    padding-right: 100px;
  }
`;

const HeaderText = styled.h2`
  color: #fff;
  font-size: 14px;
`;

const FooterLink = styled.div`
  margin: 22px 0;
  font-weight: 300;

  :hover {
    color: #00e2c1;
  }
`;

const FooterText = styled.span`
  margin: 22px 0;
  font-weight: 100;
`;

const FooterWrapper = styled.div`
  padding: 70px 20px;

  @media ${device.tablet} {
    padding: 70px;
  }
`;

const SocialButtons = styled(Button)`
  margin-right: 10px;
  height: 40px !important;
  width: 40px;
`;

class MarketFooter extends React.Component {
  render() {
    return (
      <Footer
        style={{ color: '#fff', height: '460px', padding: '0px', zIndex: 2 }}
      >
        <FooterWrapper>
          <Row type="flex" align="top" gutter={24}>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{ marginBottom: '100px' }}
            >
              <img alt="MARKET Protocol logo" src={logoImg} />
              <AboutMarketText>
                MARKET Protocol provides the open source building blocks
                powering decentralized derivatives trading and exchanges on the
                Ethereum blockchain.
              </AboutMarketText>
              <div style={{ marginTop: '35px' }}>
                <Link to="https://t.me/Market_Protocol_Chat" target="_blank">
                  <SocialButtons size="small" type="primary">
                    <img
                      alt="crypto derivatives telegram"
                      src={telegram}
                      width="80%"
                    />
                  </SocialButtons>
                </Link>
                <Link to="https://twitter.com/MarketProtocol/" target="_blank">
                  <SocialButtons size="small" type="primary">
                    <img
                      alt="decentralized exchange twitter"
                      src={twitter}
                      width="80%"
                    />
                  </SocialButtons>
                </Link>
                <Link to="https://medium.com/market-protocol" target="_blank">
                  <SocialButtons size="small" type="primary">
                    <img
                      alt="ethereum derivatives medium"
                      src={medium}
                      width="80%"
                    />
                  </SocialButtons>
                </Link>
                <Link to="https://github.com/MARKETProtocol/" target="_blank">
                  <SocialButtons size="small" type="primary">
                    <img
                      alt="open source ethereum dApp"
                      src={github}
                      width="80%"
                    />
                  </SocialButtons>
                </Link>
                <Link
                  to="https://www.youtube.com/c/MARKETProtocol"
                  target="_blank"
                >
                  <SocialButtons size="small" type="primary">
                    <img
                      alt="trading any assets youtube"
                      src={youtube}
                      width="80%"
                    />
                  </SocialButtons>
                </Link>
              </div>
              <AboutMarketText>
                <span style={{ marginTop: '35px', display: 'block' }}>
                  ©2018 Market Protocol, LLC
                </span>
              </AboutMarketText>
            </Col>
            <Col xs={12} sm={8} md={4} lg={4} xl={4}>
              <HeaderText>Documentation</HeaderText>
              <FooterLink>
                <Link
                  to="https://marketprotocol.io/assets/MARKET_Protocol-Whitepaper.pdf"
                  target="_blank"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Whitepaper
                </Link>
              </FooterLink>
              <FooterLink>
                <Link
                  to="https://marketprotocol.io/assets/MARKET_Protocol-Summary.pdf"
                  target="_blank"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Summary
                </Link>
              </FooterLink>
              <FooterLink>
                <Link
                  to="https://github.com/MARKETProtocol"
                  target="_blank"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Github
                </Link>
              </FooterLink>
              <FooterLink>
                <Link
                  to="https://docs.marketprotocol.io/"
                  target="_blank"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Technical Docs
                </Link>
              </FooterLink>
              <FooterLink>
                <Link
                  to="/presale"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Pre-Sale
                </Link>
              </FooterLink>
              <FooterLink>
                <Link
                  to="https://docs.marketprotocol.io/#faq-general"
                  target="_blank"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  FAQ
                </Link>
              </FooterLink>
            </Col>
            <Col xs={12} sm={8} md={4} lg={4} xl={4}>
              <HeaderText>Community</HeaderText>
              <FooterLink>
                <Link
                  to="https://t.me/Market_Protocol_Chat"
                  target="_blank"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Telegram
                </Link>
              </FooterLink>
              <FooterLink>
                <Link
                  to="https://twitter.com/MarketProtocol"
                  target="_blank"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Twitter
                </Link>
              </FooterLink>
              <FooterLink>
                <Link
                  to="https://medium.com/market-protocol"
                  target="_blank"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Medium
                </Link>
              </FooterLink>
              <FooterLink>
                <Link
                  to="https://discordapp.com/invite/qN8MCbq"
                  target="_blank"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Discord
                </Link>
              </FooterLink>
              <FooterLink>
                <Link
                  to="/press"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Press
                </Link>
              </FooterLink>
            </Col>
            <Col xs={8} sm={8} md={4} lg={4} xl={4}>
              <HeaderText>Organization</HeaderText>
              <FooterLink>
                <Link
                  to="/team"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Team
                </Link>
              </FooterLink>
              <FooterLink>
                <Link
                  to="/partners"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Partners
                </Link>
              </FooterLink>
              <FooterLink>
                <Link
                  to="/jobs"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Jobs (We're hiring!)
                </Link>
              </FooterLink>
              <FooterText>
                4450 Arapahoe Ave, Suite 100 Boulder, CO 80303
              </FooterText>
              <FooterLink>
                <Link
                  to="mailto:info@marketprotocol.io"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  info@marketprotocol.io
                </Link>
              </FooterLink>
            </Col>
          </Row>
        </FooterWrapper>
      </Footer>
    );
  }
}

export default MarketFooter;
