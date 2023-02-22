
import { Button, Form, Input, InputNumber, message, notification } from 'antd';

import { useEffect, useState} from "react"
import Confirmation from '../components/confirmation';

const Insert = () => {

    const [confirmationMongo, setConfirmationMongo] = useState({})
    const [confirmationRubidex, setConfirmationRubidex] = useState({})
    const [alert, setAlert] = useState(false)
    const [visibleMongo, setVisibleMongo] = useState(false)
    const [visibleRubidex, setVisibleRubidex] = useState(false)

    async function postData(url = 'http://localhost:3000/api/insert', data = {}) {
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
        //setConfirmationMongo(result)
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

      const sendToMongo = async (product) => {
        const resultMongo = await postData("./api/insert", product)
        setConfirmationMongo(resultMongo)
        setVisibleMongo(true)
      }

      const sendToRubidex = async (product) => {
        const resultRubidex = await postData("./api/rubidex/insert", product)
        setConfirmationRubidex(resultRubidex)
        setVisibleRubidex(true)
      }
      
      const onFinish = async ({product}) => {
        sendToRubidex(product)
        sendToMongo(product)
        
        // const resultMongo = await postData("./api/insert", product)
        // setConfirmationMongo(resultMongo)
        // setVisibleMongo(true)
        // const resultRubidex = await postData("./api/rubidex/insert", product)
        // setConfirmationRubidex(resultRubidex)
        // setVisibleRubidex(true)
      }

      useEffect(() => {
        const timeoutMongo = setTimeout(() => {
          setVisibleMongo(false)
        }, 5000)
        return (() => {
          clearTimeout(timeoutMongo)
        })
      }, [visibleMongo])

      useEffect(() => {
        const timeoutRubidex = setTimeout(() => {
          setVisibleRubidex(false)
        }, 5000)
        return (() => {
          clearTimeout(timeoutRubidex)
        })
      }, [visibleRubidex])
    

    return <>
        <h2>Insert a product</h2>
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
                rules={[
                    {
                    required: true,
                    },
                ]}
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
        {visibleMongo && <Confirmation
          system="MongoDb"
          success={confirmationMongo.acknowledged}
          message={`Inserted Id: ${confirmationMongo.insertedId}`}

        
        ></Confirmation>}
        {visibleRubidex && <Confirmation
          system="Rubidex"
          success={confirmationRubidex.acknowledged}
          message={`Rudidex received the following object: ${JSON.stringify(confirmationRubidex.receivedObject)}`}

        
        ></Confirmation>}
    </>
    
}

export default Insert


