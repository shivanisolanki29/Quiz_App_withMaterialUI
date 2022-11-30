import useStateContext, { stateContext } from '../hooks/useStateContext'

export default function Quiz() {
  const {context, setContext} = useStateContext(stateContext)
  ///ghjdf
  // setContext({ timeTaken: 1 })
  console.log(context);
  return (
    <div>Question</div>
  )
}
