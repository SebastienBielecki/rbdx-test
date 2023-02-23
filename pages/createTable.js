

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, Checkbox } from 'antd';
const { Option } = Select;

import { useState} from "react"
import Confirmation from '../components/confirmation';
import styles from "../styles/createTable.module.css"

const Insert = () => {

    const [confirmation, setConfirmation] = useState({})
    const [tableName, setTableName] = useState(null)

    async function postData(url = '/api/createTable', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        const result = await response.json()
        //return response.json(); // parses JSON response into native JavaScript objects
        return result
      }

    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
    };
      
      /* eslint-disable no-template-curly-in-string */
      const validateMessages = {
        // required: '${label} is required!',
        // types: {
        //   email: '${label} is not a valid email!',
        //   number: '${label} is not a valid number!',
        // },
        // number: {
        //   range: '${label} must be between ${min} and ${max}',
        // },
      };
      /* eslint-enable no-template-curly-in-string */
      
      // const onFinish = async ({product}) => {
      //   console.log(product);
      //   const result = await postData('http://localhost:3000/api/createTable', {})
      //   setConfirmation(result)
      // };


      const [form] = Form.useForm();
      const onFinish = async (values) => {
        console.log('Received values of form:', values);
        const result = await postData("./api/rubidex/createTable", values)
        console.log(result);
        setConfirmation(result)
      };
      const handleChange = () => {
        form.setFieldsValue({
          sights: [],
        });
      };

   

    return <>
        <h2 className={styles.title}>Create a collection / table</h2>
        <div className='instructions'>
          <p>Define the collection / name</p>
          <p>Optionally, define a schema, e.g. fields name and attributes</p>
        </div>
        
        <Form
          form={form}
          name="create-collection"
          onFinish={onFinish}
          style={{
            //maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            name="collection-name"
            label="Collection name"
            rules={[
              {
                required: true,
                message: 'Missing collection name',
              },
            ]}
          >
            <Input></Input>
            {/* <Select options={areas} onChange={handleChange} /> */}
          </Form.Item>
          <Form.List name="fields">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline">
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                    <Form.Item
                      {...field}
                      label="Field name"
                      name={[field.name, 'field-name']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing field name',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "type"]}
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
                      {...field}
                      name={[field.name, "mandatory"]}
                      valuePropName="checked"
                      // wrapperCol={{
                      //     offset: 8,
                      //     span: 16,
                      // }}
                      >
                      <Checkbox>Mandatory</Checkbox>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "unique"]}
                      valuePropName="checked"
                      // wrapperCol={{
                      //     offset: 8,
                      //     span: 16,
                      // }}
                      >
                      <Checkbox>Unique</Checkbox>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "autoIncrement"]}
                      valuePropName="checked"
                      // wrapperCol={{
                      //     offset: 8,
                      //     span: 16,
                      // }}
                      >
                      <Checkbox>Auto-increment</Checkbox>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "indexed"]}
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
                    Add fields
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
        <Confirmation
          system="Rubidex API answer"
          success={true}
          message={JSON.stringify(confirmation)}
        ></Confirmation>
    </>
}

export default Insert


