import React, { useState } from "react";
import styled from "styled-components";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaUserShield,
} from "react-icons/fa";

import { auth } from "../service/firebase";

import Alert from "../components/Alert";

import eventupBg from "../assets/eventup.png";

function CadastroUsuario({ onRegisterSuccess, onLogin }) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [mensagem, setMensagem] =
    useState("");

  const [tipo, setTipo] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setMensagem(
        "Senha deve ter pelo menos 6 caracteres"
      );

      setTipo("ERRO");

      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setMensagem(
        "Conta criada com sucesso!"
      );

      setTipo("SUCESSO");

      setEmail("");
      setPassword("");

      setTimeout(() => {
        onRegisterSuccess();
      }, 1200);
    } catch (error) {
      if (
        error.code ===
        "auth/email-already-in-use"
      ) {
        setMensagem(
          "Email já está em uso"
        );
      } else if (
        error.code ===
        "auth/invalid-email"
      ) {
        setMensagem("Email inválido");
      } else if (
        error.code ===
        "auth/weak-password"
      ) {
        setMensagem(
          "Senha muito fraca"
        );
      } else {
        setMensagem(
          "Erro ao criar conta"
        );
      }

      setTipo("ERRO");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Overlay />

      <Card>
        <Header>
          <IconWrapper>
            <FaUserShield />
          </IconWrapper>

          <Title>
            Criar Conta
          </Title>

          <Subtitle>
            Crie sua conta para acessar
            os eventos
          </Subtitle>
        </Header>

        {mensagem && (
          <AlertWrapper>
            <Alert
              tipo={tipo}
              mensagem={mensagem}
            />
          </AlertWrapper>
        )}

        <Form onSubmit={handleRegister}>
          <InputGroup>
            <InputIcon>
              <FaEnvelope />
            </InputIcon>

            <Input
             name="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
            />
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <FaLock />
            </InputIcon>

            <Input
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

            <PasswordToggle
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </PasswordToggle>
          </InputGroup>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner />
                Criando...
              </>
            ) : (
              <>
                Criar Conta
                <FaArrowRight />
              </>
            )}
          </Button>

          <LoginSection>
            <LoginText>
              Já possui uma conta?
            </LoginText>

            <LoginLink type="button" onClick={onLogin}>
              Entrar
            </LoginLink>
          </LoginSection>
        </Form>
      </Card>
    </Container>
  );
}

export default CadastroUsuario;

const Container = styled.div`
  position: relative;

  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px;

  overflow: hidden;

  background-image: url(${eventupBg});

  background-size: cover;

  background-position: center;

  background-repeat: no-repeat;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const Overlay = styled.div`
  position: absolute;

  inset: 0;

  background: rgba(0, 0, 0, 0.55);

  backdrop-filter: blur(4px);
`;

const Card = styled.div`
  position: relative;

  z-index: 2;

  width: 100%;
  max-width: 100%;

  background: rgba(
    255,
    255,
    255,
    0.93
  );

  backdrop-filter: blur(12px);

  border-radius: 32px;

  padding: 32px 24px;

  border: 1px solid
    rgba(255, 255, 255, 0.25);

  box-shadow: 0 20px 50px
    rgba(0, 0, 0, 0.35);

  @media (min-width: 768px) {
    max-width: 450px;

    padding: 48px 40px;

    border-radius: 36px;
  }

  @media (min-width: 1024px) {
    max-width: 480px;
  }
`;

const Header = styled.div`
  text-align: center;

  margin-bottom: 32px;
`;

const IconWrapper = styled.div`
  font-size: 52px;

  color: #7c5cff;

  margin-bottom: 16px;

  @media (min-width: 768px) {
    font-size: 58px;
  }
`;

const Title = styled.h1`
  font-size: 30px;

  font-weight: 700;

  color: #111;

  margin-bottom: 8px;

  @media (min-width: 768px) {
    font-size: 34px;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;

  color: #666;

  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

const AlertWrapper = styled.div`
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  gap: 18px;
`;

const InputGroup = styled.div`
  position: relative;

  width: 100%;
`;

const InputIcon = styled.div`
  position: absolute;

  left: 16px;
  top: 50%;

  transform: translateY(-50%);

  color: #999;

  font-size: 16px;

  z-index: 2;
`;

const Input = styled.input`
  width: 100%;

  box-sizing: border-box;

  padding: 15px 50px;

  border: 1.5px solid #ddd;

  border-radius: 18px;

  background: rgba(
    255,
    255,
    255,
    0.9
  );

  outline: none;

  font-size: 15px;

  transition: all 0.3s ease;

  &:focus {
    border-color: #7c5cff;

    background: white;

    box-shadow: 0 0 0 4px
      rgba(124, 92, 255, 0.15);
  }

  &::placeholder {
    color: #aaa;
  }

  @media (min-width: 768px) {
    font-size: 16px;

    padding: 16px 52px;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;

  right: 16px;
  top: 50%;

  transform: translateY(-50%);

  background: none;

  border: none;

  color: #999;

  cursor: pointer;

  display: flex;

  font-size: 16px;

  &:hover {
    color: #7c5cff;
  }
`;

const Button = styled.button`
  width: 100%;

  padding: 15px;

  border: none;

  border-radius: 18px;

  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 100%
  );

  color: white;

  font-size: 16px;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 12px;

  cursor: ${({ disabled }) =>
    disabled
      ? "not-allowed"
      : "pointer"};

  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);

    box-shadow: 0 10px 24px
      rgba(102, 126, 234, 0.35);
  }

  &:disabled {
    opacity: 0.7;
  }

  @media (min-width: 768px) {
    font-size: 17px;

    padding: 16px;
  }
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;

  border: 2px solid
    rgba(255, 255, 255, 0.3);

  border-top-color: white;

  border-radius: 50%;

  animation: spin 0.7s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoginSection = styled.div`
  text-align: center;

  padding-top: 20px;

  margin-top: 8px;

  border-top: 1px solid #eee;
`;

const LoginText = styled.span`
  font-size: 14px;

  color: #666;
`;

const LoginLink = styled.button`
  margin-left: 8px;

  font-size: 14px;

  font-weight: 600;

  color: #7c5cff;

  text-decoration: none;

  border: none;
  background: none;
  padding: 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;