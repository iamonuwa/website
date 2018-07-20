import React from 'react';
import { shallow } from 'enzyme';
import { Col, Row } from 'antd';
import PresaleHeader, { HeroInfo } from '@components/Presale/PresaleHeader';

describe('<PresaleHeader />', () => {
    it('renders one Row component', () => {
        const component = shallow(<PresaleHeader />);
        const rowComponent = component.find(Row);
        const rowComponentProps = rowComponent.props();
        expect(rowComponent).to.have.length(1);
        expect(rowComponentProps.type).to.equal('flex');
        expect(rowComponentProps.className).to.equal('hero');
        expect(rowComponentProps.align).to.equal('middle');
    });

    it('renders two Col components', () => {
        const component = shallow(<PresaleHeader />);
        const colComponents = component.find(Col);
        const firstColComponentProps = colComponents.at(0).props();
        const secondColComponentProps = colComponents.at(1).props();
        expect(colComponents).to.have.length(2);
        expect(firstColComponentProps.xs).to.equal(24);
        expect(secondColComponentProps.md).to.equal(24);
    });

    it('renders PresaleHeader with title text', () => {
        const component = shallow(<PresaleHeader />);
        expect(
        component
            .find(HeroInfo)
            .render()
            .text()
        ).to.equal('Presale');
    });
});