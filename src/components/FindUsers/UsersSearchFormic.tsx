import { Field, Form, Formik } from "formik"
import { FilterUsers } from "../../state/findUsers-reducer"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../state/redux-store"

type PropsType = {
  onSearchUsers: (filter: FilterUsers) => void
}
type FormType = {
  term: string;
  friend: 'null' | 'true' | 'false' 
}

const SearchUsersFormic: React.FC<PropsType> = React.memo((props) => {
  const filter = useSelector((state: RootState) => state.findUsers.filter)
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ term: filter.term, friend: String(filter.friend) as 'null' | 'true' | 'false' }}
        validate={(values) => { values }}
        onSubmit={(values: FormType) => {
          const filter: FilterUsers = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
          }
          props.onSearchUsers(filter)
        }}
      >
        <Form>
          <Field id="term" type='text' name="term" placeholder="Search" />
          <Field name="friend" as="select">
            <option value="null">All</option>
            <option value="true">Only Followed</option>
            <option value="false">Only Unfollowed</option>
          </Field>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
})
export default SearchUsersFormic
