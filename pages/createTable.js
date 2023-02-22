

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

import { useState} from "react"
import styles from "../styles/createTable.module.css"

const Insert = () => {

    const [confirmation, setConfirmation] = useState({})
    const [tableName, setTableName] = useState(null)
    console.log({confirmation});

    console.log("create table page re-rendering");

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
        console.log(result);
        setConfirmation(result)
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

      const onFinish = async (values) => {
        console.log('Received values of form:', values);
        const datatoSend = {
          tableName,
          fields: {...values}
        }
        const result = await postData('/api/createTable', datatoSend)
        console.log(result);
      };

      const onFinishTableName = (values) => {
        console.log('Success:', values);
        setTableName(values.tableName)
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

   

    return <>
        <h2 className={styles.title}>Create a collection</h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinishTableName}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Table name"
            name="tableName"
            rules={[{ required: true, message: 'Please input the table name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {tableName && <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Form.List name={tableName}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'fieldName']}
                      rules={[{ required: true, message: 'Missing field name' }]}
                    >
                      <Input placeholder="Field Name" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
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
        </Form>}
        
        
    </>
    
}

export default Insert


