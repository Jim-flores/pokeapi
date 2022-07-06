import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameGlobal } from '../../store/slices/nameUser.slice'

const InputHome = ({clickLogged}) => {

  const {handleSubmit, reset, register} = useForm()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const submit = data => {
    dispatch(setNameGlobal(data.nameUser))
    if(data.nameUser){
      reset({
        nameUser: ''
      })
      navigate('/pokedex')
    }else{
      alert('Ingresa tu nombre de entrenador')
      navigate('/')
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <input placeholder='Ingresa tu nombre de entrenador' type="text" {...register('nameUser')} />
        <button onClick={clickLogged}> <b> Go to Pokedex</b></button>
        <img src="https://cdn-icons-png.flaticon.com/512/362/362003.png" alt="" />
      </form>
    </div>
  )
}

export default InputHome