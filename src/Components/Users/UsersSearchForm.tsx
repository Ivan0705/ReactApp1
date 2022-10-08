import React from "react";
import {Formik} from "formik";
import {FilterType} from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/user-selector";
// @ts-ignore
import searchClass from './Users.module.css'

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = (props) => {
    const usersSearchFormValidate = (values) => {
        const errors = {};
        return errors;
    };
    type FriendFormType = 'true' | 'false' | 'null';
    type FormType = {
        term: '',
        friend: FriendFormType
    }
    const filter = useSelector(getUsersFilter);
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        };
        props.onFilterChanged(filter);
        setSubmitting(false)
    };


    return <div className={searchClass.searchDiv}>
        <Formik
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (// @ts-ignore
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="term"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={'Enter'}

                    />
                    {errors.term && touched.term && errors.term}
                    <select name="friend" onChange={handleChange}
                            onBlur={handleBlur} placeholder={"Favorite Color"}>
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </select>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </form>
            )}
        </Formik>
    </div>
};


