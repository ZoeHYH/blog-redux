import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { ReactComponent as Search } from "../image/search.svg";
import { H7, StyledH5, StyledH7, TextColor } from "./Text";
import { useRef, useState } from "react";
import { Transition } from "./Animation";
import { AfterLine } from "./Line";
import { ReactComponent as Down } from "../image/down.svg";
import { Button } from "./Button";
import { Image } from "./Image";
import UploadUrl from "../image/upload.svg";
import { uploadImage } from "../WebAPI";
import { FlexCenter, Wrapper } from "./Layout";
import LogoAnimated from "../image/logo_animated.svg";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostsSearch,
  selectPostsQuery,
} from "../redux/reducers/postReducer";

const StyledSearchInput = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  & input {
    ${StyledH7}
    padding: 0.25rem 0;
    width: 6rem;
    border: none;
  }
  &:after {
    ${AfterLine}
    left: auto;
    right: 0;
    transform: translate(0, 0);
  }
  & input::placeholder {
    color: transparent;
  }
  & button {
    ${FlexCenter}
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
    & svg {
      ${Transition}
      fill: ${({ theme }) => theme.color.grey[500]};
    }
  }
  &:hover {
    &:after {
      width: 100%;
    }
    & input::placeholder {
      ${Transition}
      color: ${({ theme }) => theme.color.grey[500]};
    }
    svg {
      fill: ${({ theme }) => theme.color.primaryDark};
    }
  }
`;

export const SearchInput = () => {
  const history = useHistory();
  const [value, setValue] = useState("");
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const query = useSelector(selectPostsQuery);

  const handleOnChange = ({ target }) => {
    setValue(target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (value && value !== query) {
      dispatch(getPostsSearch(value));
      setValue("");
      if (pathname !== "/result") history.push("/result");
    }
  };

  return (
    <StyledSearchInput onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="搜尋"
        name="search"
        value={value}
        onChange={handleOnChange}
      />
      <button>
        <Search />
      </button>
    </StyledSearchInput>
  );
};

const Label = styled.label`
  ${StyledH5}
  ${TextColor}
  cursor: pointer;
`;

const StyledInputBlock = css`
  ${StyledH7}
  ${Transition}
  padding: 1rem 0;
  border: none;
  border-bottom: 1px solid
    ${({ theme, alert }) => (alert ? theme.color.error : theme.color.black)};
  width: 100%;
  &:hover,
  &:focus {
    border-color: ${({ theme, alert }) =>
      alert ? theme.color.error : theme.color.primaryLight};
  }
`;

const StyledInput = styled.input`
  ${StyledInputBlock}
`;

export const Input = ({
  title,
  type,
  name,
  placeholder,
  value,
  handleOnChange,
  alert,
  required,
}) => (
  <div>
    <Label htmlFor={name} $grey700>
      {title}
    </Label>
    <StyledInput
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={({ target }) => handleOnChange(target.value)}
      alert={alert}
      required={required}
    />
  </div>
);

Input.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  handleOnChange: PropTypes.func,
  alert: PropTypes.bool,
  required: PropTypes.bool,
};

const StyledTextarea = styled.textarea`
  ${StyledInputBlock}
  resize: vertical;
  transition: border 0.3s ease-in-out;
  height: 20rem;
`;

export const Textarea = ({
  title,
  name,
  placeholder,
  value,
  handleOnChange,
  alert,
  required,
}) => (
  <div>
    <Label htmlFor={name} $grey700>
      {title}
    </Label>
    <StyledTextarea
      as="textarea"
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={({ target }) => handleOnChange(target.value)}
      alert={alert}
      required={required}
      row="1"
    />
  </div>
);

Textarea.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  handleOnChange: PropTypes.func,
  alert: PropTypes.bool,
  required: PropTypes.bool,
};

const StyledSelect = styled.select`
  ${StyledInputBlock}
  appearance: none;
  cursor: pointer;
  &:invalid {
    color: ${({ theme }) => theme.color.grey[500]};
  }
`;

const ArrowDown = styled.div`
  position: relative;
  & svg {
    ${Transition}
    z-index: -1;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
  }
  &:hover svg,
  &:focus svg {
    stroke: ${({ theme }) => theme.color.primaryLight};
  }
`;

export const Select = ({
  title,
  name,
  placeholder,
  options,
  value,
  handleValue,
  alert,
  required,
}) => (
  <div>
    <Label htmlFor={name} $grey700>
      {title}
    </Label>
    <ArrowDown alert={alert}>
      <Down />
      <StyledSelect
        id={name}
        name={name}
        value={value}
        onChange={({ target }) => {
          handleValue(target.value);
        }}
        alert={alert}
        required={required}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </StyledSelect>
    </ArrowDown>
  </div>
);

Select.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleValue: PropTypes.func,
  alert: PropTypes.bool,
  required: PropTypes.bool,
};

const StyledInlineInput = styled.form`
  display: flex;
  justify-content: center;
  & > * ~ * {
    margin-left: 1rem;
  }
  ${({ theme }) => theme.media.md} {
    flex-direction: column;
    align-items: flex-start;
    & > * ~ * {
      margin-left: 0;
      margin-top: 1rem;
    }
  }
`;

export const InlineInput = ({
  type,
  placeholder,
  value,
  handleValue,
  buttonText,
  handleSubmit,
}) => (
  <StyledInlineInput
    onSubmit={(event) => {
      event.preventDefault();
      handleSubmit(value);
    }}
  >
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={({ target }) => handleValue(target.value)}
      required
    />
    <Button>{buttonText}</Button>
  </StyledInlineInput>
);

InlineInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  handleValue: PropTypes.func,
  buttonText: PropTypes.string,
  handleSubmit: PropTypes.func,
};

const StyledFileInput = styled.div`
  & .uploader {
    ${FlexCenter}
    ${Transition}
    height: 500px;
    background: url(${UploadUrl}) center/20% no-repeat,
      ${({ theme }) => theme.color.grey[300]};
    cursor: pointer;
    &:hover {
      background: url(${UploadUrl}) center/20% no-repeat,
        ${({ theme }) => theme.color.grey[100]};
    }
    &.loading {
      background: url(${LogoAnimated}) center/20% no-repeat,
        ${({ theme }) => theme.color.grey[100]};
    }
    & div {
      display: block;
    }
  }
  & div ~ div {
    margin-top: 1rem;
  }
  & .flex {
    ${FlexCenter}
    & > * ~ * {
      margin-left: 1rem;
    }
    ${({ theme }) => theme.media.md} {
      flex-direction: column;
      & > * ~ * {
        margin-left: 0;
        margin-top: 1rem;
      }
    }
  }
  & input[type="url"] {
    ${StyledInputBlock}
  }
  & input[type="file"] {
    display: none;
  }
`;

export const FileInput = ({ value, handleImage }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const input = useRef(null);
  const [loading, setLoading] = useState(false);
  const id =
    value && value.slice(value.lastIndexOf("/") + 1, value.lastIndexOf("."));
  const handleUpload = async (image) => {
    try {
      setLoading(true);
      const { secure_url } = await uploadImage(image, id);
      handleImage(secure_url);
      setLoading(false);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("上傳失敗" + error.message);
      setLoading(false);
    }
  };

  return (
    <StyledFileInput>
      <div className={"banner"}>
        <label htmlFor="file" className={`uploader ${loading && "loading"}`}>
          {!loading && <Image $width={"max"} $height={"500"} $image={value} />}
        </label>
      </div>
      <Wrapper $small>
        <InlineInput
          type={"url"}
          placeholder={"或輸入圖片網址"}
          buttonText={"使用網址"}
          value={value}
          handleValue={(value) => handleImage(value)}
          handleSubmit={handleUpload}
        />
        <div className={"flex"}>
          <H7 $error>{errorMessage}</H7>
        </div>
      </Wrapper>
      <input
        type="file"
        id="file"
        ref={input}
        onChange={({ target }) => handleUpload(target.files[0])}
        accept="image/*"
      />
    </StyledFileInput>
  );
};

FileInput.propTypes = {
  value: PropTypes.string,
  handleImage: PropTypes.func,
  id: PropTypes.number,
};
