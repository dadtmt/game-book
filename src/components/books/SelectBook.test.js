import React from 'react'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'

import SelectBook from './SelectBook'

describe('SelectBook component', () => {
  it('component renders correctly', () => {
    const props = {
      id: 'ID',
      description: `Verum ad istam omnem orationem brevis est defensio. Nam quoad aetas M. Caeli dare potuit isti suspicioni locum, fuit primum ipsius pudore, deinde etiam patris diligentia disciplinaque munita. Qui ut huic virilem togam deditšnihil dicam hoc loco de me; tantum sit, quantum vos existimatis; hoc dicam, hunc a patre continuo ad me esse deductum; nemo hunc M. Caelium in illo aetatis flore vidit nisi aut cum patre aut mecum aut in M. Crassi castissima domo, cum artibus honestissimis erudiretur.`,
      imageUrl: 'http://lorempixel.com/400/200/',
      title: 'Book Title'
    }
    const tree = renderer
      .create(
        <BrowserRouter>
          <SelectBook {...props} />
        </BrowserRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
