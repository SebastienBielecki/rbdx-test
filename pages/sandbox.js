import { MinusCircleOutlined, PlusOutlined, DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Checkbox, Select } from 'antd';

const onFinish = (values) => {
  console.log('Received values of form:', values);
};



const Sandbox = () => {

    return <>
    
  <Form
    name="dynamic_form_nest_item"
    onFinish={onFinish}
    style={{
      //maxWidth: 600,
    }}
    autoComplete="off"
  >
    <Form.List name="fields">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{
                display: 'flex',
                marginBottom: 8,
              }}
              align="baseline"
            >
              <MinusCircleOutlined onClick={() => remove(name)} />
              <Form.Item
                {...restField}
                name={[name, 'fieldname']}
                rules={[
                  {
                    required: true,
                    message: 'Missing field name',
                  },
                ]}
              >
                <Input placeholder="Field name" />
              </Form.Item>
              <Form.Item
                name={[name, "type"]}
                label="Type"
                //hasFeedback
                rules={[
                    {
                    required: true,
                    message: 'Please select your country!',
                    },
                ]}
                >
                    <Select placeholder="Data type">
                        <Option value="integer">Integer</Option>
                        <Option value="decimal">Decimal</Option>
                        <Option value="string">String</Option>
                        <Option value="bool">Boolean</Option>
                    </Select>
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, "mandatory"]}
                valuePropName="checked"
                // wrapperCol={{
                //     offset: 8,
                //     span: 16,
                // }}
                >
                <Checkbox>Mandatory</Checkbox>
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, "unique"]}
                valuePropName="checked"
                // wrapperCol={{
                //     offset: 8,
                //     span: 16,
                // }}
                >
                <Checkbox>Unique</Checkbox>
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, "autoIncrement"]}
                valuePropName="checked"
                // wrapperCol={{
                //     offset: 8,
                //     span: 16,
                // }}
                >
                <Checkbox>Auto-increment</Checkbox>
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, "indexed"]}
                valuePropName="checked"
                // wrapperCol={{
                //     offset: 8,
                //     span: 16,
                // }}
                >
                <Checkbox>indexed</Checkbox>
              </Form.Item>

            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </>
};
export default Sandbox;