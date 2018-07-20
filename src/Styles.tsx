import styled, { injectGlobal } from 'styled-components';
import { device, size } from './breakpoints';

injectGlobal`
.bio-wrap {
  visibility: hidden;
  opacity: 0;
  transition: 250ms;

  &.visible {
    visibility: visible;
    opacity: 1;
    transition: 250ms;
  }
}

.become-opaque-on-hover {
  opacity: 1;
  transition: 250ms;

  &:hover {
    opacity: 0.75;
    transition: 250ms;
  }
}
.ant-select-dropdown-menu-item:hover {
  background-color: #e6f7ff !important;
}
.ant-select-dropdown-menu-item-disabled:hover {
  background-color: #fff !important;
}
.ant-select-dropdown-menu-item-selected,
.ant-select-dropdown-menu-item-selected:hover {
  background-color: #fafafa !important;
}
.ant-select-dropdown-menu-item-active {
  background-color: #e6f7ff !important;
}
`;

const MarketHeader = styled.h2`
  font-size: 36px;
  font-weight: 500;
  line-height: 1.1;
  text-align: ${props => props.align || ''};

  @media (max-width: ${size.laptop}) {
    font-size: 26px;
  }

  @media ${device.laptop} and (max-width: 1120px) {
    font-size: 28px;
  }
`;

const MarketText = styled.p`
  font-size: 18px;
  font-weight: 300;

  @media (max-width: ${size.laptop}) {
    font-size: 14px;
  }

  @media ${device.desktopS} {
    font-size: 22px;
  }
`;

const MarketList = styled.li`
  font-size: 18px;
  padding: 10px 0;
  list-style: none;
  font-weight: 300;
  margin-left: 20px;
  :before {
    content: '';
    line-height: 1em;
    width: 10px;
    height: 10px;
    background-color: #00e2c1;
    float: left;
    margin-top: 10px;
    border-radius: 50%;
    margin-right: 10px;
    margin-left: -20px;
  }
  @media (max-width: ${size.laptop}) {
    font-size: 14px;
    :before {
      margin-top: 5px;
    }
  }

  @media ${device.desktopS} {
    font-size: 22px;
  }
`;

const MarketDescriptionText = MarketText.extend`
  font-size: 25px;

  @media ${device.mobileS} {
    font-size: 16px;
  }
  @media ${device.tablet} {
    font-size: 22px;
  }
`;

const MarketDescriptionWrapper = styled.section`
  padding: 50px;

  @media ${device.mobileL} and (max-width: ${size.tablet}) {
    padding: 70px;
  }

  @media ${device.tablet} {
    padding: 100px;
  }

  @media ${device.laptopL} {
    padding: 100px 150px;
  }

  @media ${device.desktopS} {
    padding: 150px 350px;
  }
`;

const TeamDivWithResponsiveWidth = styled.div`
  width: 60%;

  @media (max-width: ${size.laptop}) {
    width: 80%;
  }

  @media (max-width: ${size.tablet}) {
    width: 92%;
  }
`;

const BioModalContentWrap = styled.div`
  width: 515px;

  @media (max-width: ${size.tablet}) {
    width: 350px;
  }
`;

const SectionWrapper = styled.section`
  padding: 70px;

  @media ${device.mobileS} and (max-width: ${size.mobileL}) {
    padding: 0px;
  }

  @media ${device.mobileL} and (max-width: ${size.laptop}) {
    padding: 50px;
  }

  @media ${device.desktopS} {
    padding: 100px 150px;
  }

  @media ${device.desktopM} {
    padding: 100px 250px;
  }
`;

const HeroText = styled.div`
  color: #f0f0f0;
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 30px;
  line-height: 1.2;

  @media ${device.mobileS} {
    font-size: 28px;
    margin-bottom: 0px;
  }

  @media ${size.mobileS} and (max-width: ${size.tablet}) {
    font-size: 38px;
    margin-bottom: 0px;
  }

  @media ${device.tablet} {
    font-size: 38px;
    margin-bottom: 30px;
  }

  @media ${device.laptop} {
    font-size: 60px;
  }
`;

export {
  MarketList,
  MarketHeader,
  MarketText,
  HeroText,
  BioModalContentWrap,
  TeamDivWithResponsiveWidth,
  SectionWrapper,
  MarketDescriptionText,
  MarketDescriptionWrapper
};
