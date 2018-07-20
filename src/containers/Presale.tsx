import React from 'react';
import { withSiteData } from 'react-static';
import { MarketDescriptionWrapper } from '@src/Styles';
import PresaleHeader from '../components/Presale/PresaleHeader';
import PresaleForm from '../components/Presale/PresaleForm';
import withGAPageView from './GoogleAnalyticsTracker';

export const PresaleComponent = () => (
  <MarketDescriptionWrapper>
    <PresaleHeader />
    <PresaleForm />
  </MarketDescriptionWrapper>
);

export default withGAPageView(withSiteData(PresaleComponent));
