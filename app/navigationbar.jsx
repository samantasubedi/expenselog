import React from 'react'
import Link from 'next/link'

const navigationbar = () => {
  return (
<div>
    <Link  onClick className={oncaki}>Home</Link>
    <Link>My Expenses</Link>
    <Link>Add Expense</Link>
</div>
  )
}

export default navigationbar