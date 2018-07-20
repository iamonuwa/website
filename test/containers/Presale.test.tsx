import React from 'react';
import { mount, shallow } from 'enzyme';

import Presale, { PresaleComponent } from '@containers/Presale';
import PresaleHeader from '@components/Presale/PresaleHeader';
import PresaleForm from '@components/Presale/PresaleForm';


describe('<Presale />', () => {
    it('renders content', () => {
      const component = mount(<Presale />);
      expect(component.getElement()).not.to.be.null;
    });

    it('renders all site components', () => {
        const component = shallow(<PresaleComponent />);
        expect(component.find(PresaleHeader)).to.have.length(1);
        expect(component.find(PresaleForm)).to.have.length(1);
      });

});