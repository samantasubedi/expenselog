import React from 'react'
import Link from 'next/link'

const navigationbar = () => {
  return (
<div className='flex w-[50%] justify-evenly'>
    <Link href="/" >Home</Link>
    <Link href="/myexpenses">My Expenses</Link>
    <Link href="addexpenses">Add Expense</Link>
</div>
  )
}

export default navigationbar