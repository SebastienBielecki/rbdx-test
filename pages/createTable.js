
import { Button, Form, Input, InputNumber } from 'antd';

import { useState} from "react"

const Insert = () => {

    const [confirmation, setConfirmation] = useState({})
    console.log({confirmation});

    console.log("insert page re-rendering");

    async function postData(url = 'http://localhost:3000/api/createTable', data = {}) {
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
      
      const onFinish = async ({product}) => {
        console.log(product);
        const result = await postData('http://localhost:3000/api/createTable', {})
        setConfirmation(result)
      };

   

    return <>
        <h2>Create a collection</h2>
        <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{
            maxWidth: 600,
            }}
            validateMessages={validateMessages}
        >
            <Form.Item
                name={['product', 'name']}
                label="Product name"
                // rules={[
                //     {
                //     required: true,
                //     },
                // ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['product', 'price']}
                label="Price"
                // rules={[
                //     {
                //     type: 'email',
                //     },
                // ]}
                >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name={['product', 'cost']}
                label="Cost"
                rules={[
                    // {
                    // type: 'number',
                    // min: 0,
                    // max: 99,
                    // },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        <h2>{confirmation.acknowledged}</h2>
        <p>{confirmation.insertedId}</p>
    </>
    
}

export default Insert


