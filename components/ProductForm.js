import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useCartContext, useAddToCartContext } from '@/context/Store'

function ProductForm({ title, handle, variants, setVariantPrice, mainImg }) {
  const [recipient, setRecipient] = useState("Recipient")
  const [sender, setSender] = useState("Sender")
  const [message, setMessage] = useState("Message")
  const [quantity, setQuantity] = useState(1)
  const [variantId, setVariantId] = useState(variants[0].node.id)
  const [variant, setVariant] = useState(variants[0])
  const isLoading = useCartContext()[2]
  const addToCart = useAddToCartContext()

  const atcBtnStyle = isLoading ?
    `pt-3 pb-2 bg-palette-primary text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex 
                      justify-center items-baseline  hover:bg-palette-dark opacity-25 cursor-none`
    :
    `pt-3 pb-2 bg-palette-primary text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex 
                      justify-center items-baseline  hover:bg-palette-dark`

  function handleSizeChange(e) {
    setVariantId(e)
    // send back size change
    const selectedVariant = variants.filter(v => v.node.id === e).pop()
    setVariantPrice(selectedVariant.node.price)

    // update variant
    setVariant(selectedVariant)
  }

  async function handleAddToCart() {
    const varId = variant.node.id

    const customAttributes = {
      sender: sender,
      recipient: recipient,
      message: message
    }

    // update store context
    if (quantity !== '') {
      addToCart({
        productTitle: title,
        productHandle: handle,
        productImage: mainImg,
        variantId: varId,
        variantPrice: variant.node.price,
        variantTitle: variant.node.title,
        variantQuantity: quantity,
        customAttributes: customAttributes
      })
    }
  }

  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function updateQuantity(e) {
    if (e === '') {
      setQuantity('')
    } else {
      setQuantity(Math.floor(e))
    }
  }

  function updateSender(e) {
    if (e === '') {
      setSender('')
    } else {
      setSender(capitalizeFirstLetter(e))
    }
  }

  function updateRecipient(e) {
    if (e === '') {
      setRecipient('')
    } else {
      setRecipient(capitalizeFirstLetter(e))
    }
  }

  function updateMessage(e) {
    if (e === '') {
      setMessage('')
    } else {
      setMessage(capitalizeFirstLetter(e))
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-start space-x-2 w-full">
        <div className="flex flex-col items-start space-y-1 flex-grow-0">
          <label className="text-gray-500 text-base">Qty.</label>
          <input
            type="number"
            inputMode="numeric"
            id="quantity"
            name="quantity"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => updateQuantity(e.target.value)}
            className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
          />
        </div>
        <div className="flex flex-col items-start space-y-1 flex-grow">
          <label className="text-gray-500 text-base">Size</label>
          <select
            id="size-selector"
            name="size-selector"
            onChange={(event) => handleSizeChange(event.target.value)}
            value={variantId}
            className="form-select border border-gray-300 rounded-sm w-full text-gray-900 focus:border-palette-light focus:ring-palette-light"
          >
            {
              variants.map(item => (
                <option
                  id={item.node.id}
                  key={item.node.id}
                  value={item.node.id}
                >
                  {item.node.title}
                </option>
              ))
            }
          </select>
        </div>
      </div>

      <div className="flex justify-start space-x-2 w-full">
        <div className="flex flex-col items-start space-y-1 flex-grow-0">
          <label className="text-gray-500 text-base">Sender</label>
          <input
            type="text"
            id="sender"
            name="sender"
            value={sender}
            onChange={(e) => updateSender(e.target.value)}
            className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
          />
        </div>
        <div className="flex flex-col items-start space-y-1 flex-grow">
          <label className="text-gray-500 text-base">Recipient</label>
          <input
            type="text"
            id="recipient"
            name="recipient"
            value={recipient}
            onChange={(e) => updateRecipient(e.target.value)}
            className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
          />
        </div>
      </div>

      <div className="flex justify-start space-x-2 w-full">
        <div className="flex flex-col items-start space-y-1 flex-grow">
          <label className="text-gray-500 text-base">Message</label>
          <textarea
            type="text"
            id="message"
            name="message"
            value={message}
            onChange={(e) => updateMessage(e.target.value)}
            className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
          />
        </div>
      </div>

      <button
        className={atcBtnStyle}
        aria-label="cart-button"
        onClick={handleAddToCart}
      >
        Add To Cart
        <FontAwesomeIcon icon={faShoppingCart} className="w-5 ml-2" />
      </button>
    </div>
  )
}

export default ProductForm
