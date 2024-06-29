import React from 'react'
import { SketchPicker } from 'react-color'  
import { useSnapshot } from 'valtio'
import store from '../store'

const ColorPicker = () => {
  const snap = useSnapshot(store);
  const handleChange = (color) => {
    store.color = color.hex
  }

  return (
    <div className='absolute left-full ml-3'>
      <SketchPicker
        color={snap.color}
        disableAlpha
        presetColors={[
          '#f44336',
          '#e91e63',
          '#9c27b0',
          '#673ab7',
          '#3f51b5',
          '#2196f3',
          '#03a9f4',
          '#00bcd4',
          '#009688',
          '#4caf50',
          '#8bc34a',
          '#cddc39',
          '#ffeb3b',
          '#ffc107',
          '#ff9800',
          '#ff5722',
          '#795548',
          '#9e9e9e',
          '#607d8b',
        ]}
        onChange={handleChange}
      />
    </div>
  )
}

export default ColorPicker