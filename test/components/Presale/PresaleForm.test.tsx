import React from 'react';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';
import { Form, Input } from 'antd';

import PresaleForm from '@components/Presale/PresaleForm';


describe('<PresaleForm />', () => {
    let component: typeof PresaleForm;
  
    beforeEach(() => {
      component = mount(
        <MemoryRouter><PresaleForm/></MemoryRouter>
      );
    });
  
    it('renders without crashing', () => {
      expect(component.find('PresaleForm').length).toEqual(
        1
      );
    });
  
    describe('Presale interest form', () => {
      it('renders a Form with the correct action url', () => {
        expect(component.find(Form).length).toBe(1);
        expect(
          component
            .find(Form)
            .at(0)
            .props().action
        ).toEqual('https://marketprotocol.us17.list-manage.com/subscribe/post');
      });
  
      it('renders 5 Input types', () => {
        expect(component.find(Form).find(Input).length).toBe(5);
        expect(
          component
            .find(Form)
            .find(Input)
            .at(0)
            .props().type
        ).toEqual('text');
      });
  });
  