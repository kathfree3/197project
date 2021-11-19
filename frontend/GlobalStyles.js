import s from 'styled-components'

export const Button = s.button`
    padding: 0.5rem;
    margin: 0.5rem;
    background: #696eb3;
    color: white;
    border: solid 1px #dbdbdb;
    border-radius: 5px;
`

export const Input = s.input`
  display: block;
  padding: 10px;
  border: solid 1px #dbdbdb;
  border-radius: 5px;
  margin-bottom: 1rem;
`
export const Label = s.label`
  margin: 0.25rem 0rem;
`
export const Form = s.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  padding: 1rem;
  width: 40%;
  float: left;
`
export const FullPage = s.div`
  padding: 1rem;
`
