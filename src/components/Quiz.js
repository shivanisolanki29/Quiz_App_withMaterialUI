import useStateContext, { stateContext } from '../hooks/useStateContext'

export default function Quiz() {
  const {context, setContext} = useStateContext(stateContext)
  
  // setContext({ timeTaken: 1 })
  console.log(context);
  return (
    <div>Question</div>
  )
}
