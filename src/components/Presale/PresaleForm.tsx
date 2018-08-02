import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { FormComponentProps } from 'antd/lib/form';
import { Button, Checkbox, Form, Input, Radio, Select } from 'antd';
import countries from './countries';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

export const PresaleWrapper = styled.div`
  padding: 0px 0px;
`;

export const StyledSelect = styled(Select)`
  .ant-select-selection {
    background: #f6f6f6 !important;
  }
  .ant-select-selection__clear {
    background-color: #f6f6f6 !important;
  }
`;

export const DisclaimerText = styled('p')`
  font-size: 14px;
  margin-top: 1rem;
`;

const investorValidator = (form, rule, value, callback) => {
  let citizen;
  let investor;
  citizen = form.getFieldValue('CITIZEN');
  investor = form.getFieldValue('ACCRED');
  if (citizen === 'US' && investor === 'no') {
    callback('Sorry, this is limited to Accredited Investors');
  }
};

class PresaleForm extends React.Component<FormComponentProps> {
  postfixSelector = (
    <StyledSelect
      defaultValue="USD"
      dropdownMenuStyle={{ backgroundColor: '#f6f6f6' }}
      filterOption={true}
      style={{
        backgroundColor: 'transparent',
        width: 80
      }}
    >
      <Option value="USD">USD</Option>
      <Option value="ETH">ETH</Option>
      <Option value="BTC">BTC</Option>
    </StyledSelect>
  );
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <PresaleWrapper>
        <Row type="flex" className="hero" align="middle">
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form
              action="https://marketprotocol.us17.list-manage.com/subscribe/post"
              onSubmit={e => {
                form.validateFields((errors, _) => {
                  if (errors) {
                    e.preventDefault();
                  }
                });
              }}
              acceptCharset="utf-8"
              method="post"
            >
              <input type="hidden" name="u" value="ef1f265a21b4aae9002084ee3" />
              <input type="hidden" name="id" value="491f750dec" />{' '}
              <h2
                style={{
                  margin: '1rem 0 1rem 0'
                }}
              >
                Interested in Contributing?
              </h2>
              <DisclaimerText>
                Please note: If you are a US person, but you are not an
                accredited investor, do not fill out this form.
              </DisclaimerText>
              <FormItem label="Full Name">
                {getFieldDecorator('FNAME', {
                  rules: [
                    {
                      message: 'Please input your full name!',
                      required: true,
                      whitespace: true
                    }
                  ]
                })(
                  <Input
                    name="FNAME"
                    type="text"
                    placeholder="Full name"
                    style={{
                      backgroundColor: '#f6f6f6',
                      marginTop: '10px'
                    }}
                  />
                )}
              </FormItem>
              <FormItem label="Email Address">
                {getFieldDecorator('EMAIL', {
                  rules: [
                    {
                      message: 'Please input an Email Address!',
                      required: true
                    },
                    {
                      message: 'Please input a correct Email Address',
                      type: 'email'
                    }
                  ]
                })(
                  <Input
                    name="EMAIL"
                    placeholder="Your email address"
                    style={{
                      backgroundColor: '#f6f6f6'
                    }}
                  />
                )}
              </FormItem>
              <FormItem label="Are you an accredited investor?">
                {getFieldDecorator('ACCRED', {
                  initialValue: 'yes',
                  rules: [
                    {
                      validator: (rule, value, callback) => {
                        investorValidator(form, rule, value, callback);
                      }
                    }
                  ]
                })(
                  <RadioGroup
                    name="ACCRED"
                    onChange={() => {
                      setTimeout(() => {
                        form.validateFields(['ACCRED'], { force: true });
                      }, 10);
                    }}
                  >
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem label="What type of entity do you represent?">
                {getFieldDecorator('ENTITY', { initialValue: 'individual' })(
                  <RadioGroup name="ENTITY">
                    <Radio value="individual">Individual</Radio>
                    <Radio value="syndicate">Syndicate</Radio>
                    <Radio value="professionalFund">Professional Fund</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem label="Desired allocation">
                {getFieldDecorator('DESIREDALL', {
                  rules: [
                    {
                      message: 'Desired allocation is required',
                      required: true
                    }
                  ]
                })(
                  <Input
                    name="DESIREDALL"
                    placeholder="25000"
                    addonAfter={this.postfixSelector}
                    style={{
                      backgroundColor: '#f6f6f6',
                      width: '80%'
                    }}
                  />
                )}
              </FormItem>
              <FormItem label="Citizenship">
                {getFieldDecorator('CITIZEN', {
                  initialValue: 'SELECT COUNTRY',
                  rules: [
                    {
                      message: 'Citizenship is required',
                      required: true
                    },
                    {
                      validator: (rule, value, callback) => {
                        investorValidator(form, rule, value, callback);
                      }
                    }
                  ]
                })(
                  <StyledSelect
                    style={{
                      width: 200
                    }}
                    showSearch={true}
                    defaultActiveFirstOption={false}
                    dropdownStyle={{ backgroundColor: '#f6f6f6' }}
                    dropdownMenuStyle={{ backgroundColor: '#f6f6f6' }}
                    optionFilterProp="children"
                    filterOption={(inputValue, option) => {
                      return option.props.children.indexOf(inputValue) >= 0;
                    }}
                  >
                    {countries.map(c => (
                      <Option key={c.code}>{c.name}</Option>
                    ))}
                  </StyledSelect>
                )}
              </FormItem>
              <FormItem label="ETH or BTC address you plan to send from (optional)">
                {getFieldDecorator('ETHADDRESS')(
                  <Input
                    name="ETHADDRESS"
                    placeholder="0x..."
                    type="text"
                    style={{
                      backgroundColor: '#f6f6f6',
                      marginTop: '10px'
                    }}
                  />
                )}
              </FormItem>
              <FormItem label="Anything else we should know? (optional)">
                {getFieldDecorator('ANYTHING')(
                  <Input
                    name="ANYTHING"
                    type="text"
                    style={{
                      backgroundColor: '#f6f6f6',
                      marginTop: '10px'
                    }}
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('CONFIRM', {
                  rules: [
                    {
                      message: 'Please check this option to continue',
                      required: true
                    }
                  ]
                })(
                  <Checkbox>
                    You agree that completion of this form is for informational
                    purposes only, and does not constitute an offer for the sale
                    of Market tokens, nor for the sale of any equity or other
                    ownership or other interest in Market Limited.
                  </Checkbox>
                )}
              </FormItem>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  marginTop: '1rem',
                  width: '10rem'
                }}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </PresaleWrapper>
    );
  }
}

const WrappedForm = Form.create<FormComponentProps>()(PresaleForm);

export default WrappedForm;
