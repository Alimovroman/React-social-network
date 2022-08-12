import { Field, Form, Formik } from "formik"
import { FilterUsers } from "../../state/findUsers-reducer"
import React from "react"

type PropsType = {
  onSearchUsers: (filter: FilterUsers) => void
}
type FormType = {
  term: string;
  friend: 'null' | 'true' | 'false'
}

const SearchUsersFormic: React.FC<PropsType> = React.memo((props) => {
  return (
    <div>
      <Formik
        initialValues={{ term: '', friend: 'null' }}
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
