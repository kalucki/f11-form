import React, {useState} from 'react';
import "bulma/css/bulma.css";
import '../styles/form.scss';
import {useFormik} from 'formik';
import {BiEnvelope} from 'react-icons/bi';
import {IoMdSend, IoMdPerson} from 'react-icons/io';
import {useTranslation} from 'react-i18next';

const Form = () => {
    const {t, i18n} = useTranslation();
    const [activeLanguage, setActiveLanguage] = useState('GB');
    const onLanguageChange = (e) => {
        i18n.changeLanguage(e.target.id).then(() => console.log(i18n));
        setActiveLanguage(e.target.id);
        formik.resetForm({});
    }
    const [sentMsgVisible, setSentMsgVisible] = useState(false);
    const handleCloseWindow = () => {
        setSentMsgVisible(!sentMsgVisible);
    }
    const validate = values => {
        const errors = {};
        if (!values.name) {
            errors.name = t('Required');
        }

        if (!values.message) {
            errors.message = t('Required');
        }
        if (!values.email) {
            errors.email = t('Required');
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = t('Invalid Email');
        }
        if (!values.topic) {
            errors.topic = t('Required');
        }
        if (values.topic === t('Software errors') && !values.version) {
            errors.version = t('Required');
        } else if (values.topic === t('Software errors') && values.version && (!/(?!\.)(\d+(\.\d+)+)(?![\d\.])/g.test(values.version))) {
            errors.version = t('Wrong Format');
        }
        if (values.topic === t('Return call') && !values.telephone) {
            errors.telephone = t('Required');
        }
        if (!values.topic) {
            errors.topic = t('Required');
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            message: '',
            topic: '',
            version: '',
            telephone: ''
        },
        validate,
        onSubmit: values => {
            // Normally onSubmit would be a fetch to an endpoint sending the formular, since there is none specified
            // I'am just showing the payload in an Alert, to show that all the data is correctly sent.
            alert(JSON.stringify(values, null, 2));
            formik.resetForm({});
            setSentMsgVisible(true);
        },
    });
    const customHandleChange = (e) => {
        formik.handleChange(e);
        formik.setFieldValue('version', '')
        formik.setErrors({"version": ''})
        formik.setFieldValue('telephone', '')
        formik.setErrors({"telephone": ''})

    }
    return (
        <div className="wrapper">
                <div className="flags-container">
                    <img
                        onClick={(e) => onLanguageChange(e)}
                        id="GB"
                        className={`flag-icon ${activeLanguage === "GB" ? "active-lang" : "inactive-lang"}`}
                        alt="English"
                        title="English"
                        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"/>
                    <img
                        onClick={(e) => onLanguageChange(e)}
                        id="DE"
                        title="Deutsch"
                        className={`flag-icon ${activeLanguage === "DE" ? "active-lang" : "inactive-lang"}`}
                        alt="Deutsch"
                        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/DE.svg"/>
                </div>
            {sentMsgVisible && <div className="notification succes-bar is-success">
                <button onClick={handleCloseWindow} className="delete"></button>
                {t('Request sent')}
            </div>}
            <div className="main-form-container">
                <h1 className="title is-bold">{t('Form')}</h1>
                <span className="subtitle support-sub">{t('Support')}</span>
                <form onSubmit={formik.handleSubmit} className="form-wrapper" action="/thanks">
                    <div className="field">
                        <label className="label" htmlFor="name">{t('Name')}</label>
                        <div className="control has-icons-left">
                            <input id="name"
                                   name="name"
                                   type="text"
                                   onBlur={formik.handleBlur}
                                   onChange={formik.handleChange}
                                   value={formik.values.name}
                                   className={`input ${formik.touched.name && formik.errors.name ? 'is-danger' : ''}`}
                                   placeholder={t('Example').concat(" John Malkovic")}/>
                            <span className="icon is-small is-left">
                            <IoMdPerson size={24}/>
                            </span>
                        </div>
                        {formik.touched.name && formik.errors.name ?
                            <span className="help is-danger error-msg">{formik.errors.name}</span> : null}
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="email">{t('Email')}</label>
                        <div className="control has-icons-left">
                            <input id="email"
                                   name="email"
                                   type="email"
                                   className={`input ${formik.touched.email && formik.errors.email ? 'is-danger' : ''}`}
                                   placeholder={t('Example').concat(" john@malkovic.com")}
                                   onBlur={formik.handleBlur}
                                   onChange={formik.handleChange}
                                   value={formik.values.email}/>
                            <span className="icon is-small is-left">
                            <BiEnvelope size={24}/>
                        </span>
                        </div>
                        {formik.touched.email && formik.errors.email ?
                            <span className="help is-danger error-msg">{formik.errors.email}</span> : null}
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="topic">{t('Topic')}</label>
                        <div className="control">
                            <div className={`select ${formik.touched.topic && formik.errors.topic ? 'is-danger' : ''}`}>
                                <select name="topic"
                                        value={formik.values.topic}
                                        onChange={(e) => customHandleChange(e)}
                                        onBlur={formik.handleBlur}
                                >
                                    <option value="">{t('Choose Topic')}</option>
                                    <option>{t('Software errors')}</option>
                                    <option>{t('General')}</option>
                                    <option>{t('Return call')}</option>
                                </select>
                            </div>
                        </div>
                        {formik.touched.topic && formik.errors.topic ?
                            <span className="help is-danger error-msg">{formik.errors.topic}</span> : null}
                    </div>


                    {(formik.values.topic === t('Return call')) ?
                        <div className="field">
                            <label className="label" htmlFor="telephone">{t('Telephone')}</label>
                            <div className="control">
                                <input id="telephone"
                                       name="telephone"
                                       type="number"
                                       onBlur={formik.handleBlur}
                                       onChange={formik.handleChange}
                                       value={formik.values.telephone}
                                       className={`input ${formik.touched.telephone && formik.errors.telephone ? 'is-danger' : ''}`}
                                       placeholder={t('Example').concat(" 123456789")}/>
                            </div>
                            {formik.touched.telephone && formik.errors.telephone ?
                                <span className="help is-danger error-msg">{formik.errors.telephone}</span> : null}
                        </div>
                        :
                        null

                    }

                    {(formik.values.topic === t('Software errors')) ?
                        <div className="field">
                            <label className="label" htmlFor="version">{t('Version')}</label>
                            <div className="control">
                                <input id="version"
                                       name="version"
                                       type="text"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.version}
                                       className={`input ${formik.touched.version && formik.errors.version ? 'is-danger' : ''}`}
                                       placeholder={t('Example').concat(" 1.1.1")}/>
                            </div>
                            {formik.touched.version && formik.errors.version ?
                                <span className="help is-danger error-msg">{formik.errors.version}</span> : null}
                        </div>
                        :
                        null
                    }

                    <div className="field textarea-selector">
                        <label className="label" htmlFor="message">{t('Description')}</label>
                        <div className="control">
                        <textarea style={{resize: 'none'}} id="message"
                                  name="message" onChange={formik.handleChange} value={formik.values.message}
                                  onBlur={formik.handleBlur}
                                  className={`textarea ${formik.touched.message && formik.errors.message ? 'is-danger' : ''}`}
                                  placeholder={t('Description placeholder')}/>
                        </div>
                        {formik.touched.message && formik.errors.message ?
                            <span className="help is-danger error-msg">{formik.errors.message}</span> : null}
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link" type="submit">{t("Submit")} <IoMdSend size={16}
                                                                                                     className="ml-2"/>
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Form;