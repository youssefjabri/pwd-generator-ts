import { useState } from 'react'
import zxcvbn from 'zxcvbn'
import Navbar from './Layouts/Navbar'
import { Checkbox, InputNumber, Button, message, Typography, Space, Divider, Tag, Card, Progress } from 'antd'
import { FaCopy } from 'react-icons/fa'
import { BsArrowRepeat } from "react-icons/bs";
const { Title, Text } = Typography

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+[]{}|;:,.<>?'

function App() {
  const [length, setLength] = useState(12)
  const [useUpper, setUseUpper] = useState(true)
  const [useLower, setUseLower] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(false)
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState(0)

  const isAnyOptionSelected = useUpper || useLower || useNumbers || useSymbols;


  const generatePassword = () => {
    let charset = ''
    if (useUpper) charset += UPPERCASE
    if (useLower) charset += LOWERCASE
    if (useNumbers) charset += NUMBERS
    if (useSymbols) charset += SYMBOLS

    if (!charset) {
      setPassword('')
      setStrength(0)
      return
    }

    let pwd = ''
    for (let i = 0; i < length; i++) {
      const rand = Math.floor(Math.random() * charset.length)
      pwd += charset[rand]
    }

    setPassword(pwd)
    const score = zxcvbn(pwd).score
    setStrength(score)
  }

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password)
      message.success('Password copied to clipboard!')
    }
  }

  return (
    <div className="bg-white min-h-screen text-black p-4">
      <Navbar />
      <Card className='bg-white mt-[40px] max-w-3xl mx-auto' >
        <Title level={2} style={{ color: 'black', textAlign: 'center' }}>Password Generator</Title>
        {password && (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div className='flex justify-between items-center'>
              <span className="text-black text-4xl" >
                {password}
              </span>
              <div className='flex gap-3' >
                <span onClick={generatePassword} className='hover:cursor-pointer text-blue-500 hover:bg-blue-100 border text-2xl w-[40px] h-[40px] p-0.5 flex transition-colors justify-center items-center rounded-lg'>
                  <BsArrowRepeat />
                </span>
                <span onClick={copyToClipboard} className='hover:cursor-pointer text-blue-500 hover:bg-blue-100 border text-2xl w-[40px] h-[40px] p-0.5 flex transition-colors justify-center items-center rounded-lg'>
                  <FaCopy />
                </span>
              </div>
            </div>
            <Space direction="vertical" className='w-full'>
              <Progress percent={(strength + 1) * 20} showInfo={true} strokeColor={['#ff4d4f', '#fa8c16', '#fadb14', '#52c41a', '#237804'][strength]} />
            </Space>
          </Space>
        )}
        <Divider />
        <Space direction="vertical" size="middle" className='w-full mx-auto'>
          <Space className='flex flex-col items-start'>
            <div>
              <Text style={{ color: 'black' }}>Length:</Text>
              <InputNumber min={4} max={24} value={length} onChange={(value) => setLength(value || 12)} style={{ width: 100 }} />
            </div>
            <Checkbox className='text-black' checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)}>
              Uppercase
            </Checkbox>
            <Checkbox className='text-black' checked={useLower} onChange={(e) => setUseLower(e.target.checked)}>
              Lowercase
            </Checkbox>
            <Checkbox className='text-black' checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)}>
              Numbers
            </Checkbox>
            <Checkbox className='text-black' checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)}>
              Symbols
            </Checkbox>
          </Space>
          <Button type="primary" onClick={generatePassword} disabled={!isAnyOptionSelected}>
            Generate Password
          </Button>
        </Space>
      </Card>
    </div>
  )
}

export default App
