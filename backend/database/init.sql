CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS bebidas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    marca VARCHAR(100),
    preco NUMERIC(10,2) NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 0,
    estoque_minimo INTEGER NOT NULL DEFAULT 10,
    categoria_id INTEGER NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_bebidas_categorias
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id),

    CONSTRAINT chk_preco_nao_negativo
        CHECK (preco >= 0),

    CONSTRAINT chk_quantidade_nao_negativa
        CHECK (quantidade >= 0),

    CONSTRAINT chk_estoque_minimo_nao_negativo
        CHECK (estoque_minimo >= 0)
);

CREATE TABLE IF NOT EXISTS movimentacoes (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL,
    quantidade INTEGER NOT NULL,
    bebida_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_movimentacoes_bebidas
        FOREIGN KEY (bebida_id)
        REFERENCES bebidas(id),

    CONSTRAINT fk_movimentacoes_usuarios
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),

    CONSTRAINT chk_tipo_movimentacao
        CHECK (tipo IN ('entrada', 'saida')),

    CONSTRAINT chk_quantidade_movimentacao_positiva
        CHECK (quantidade > 0)
);

CREATE TABLE IF NOT EXISTS alertas (
    id SERIAL PRIMARY KEY,
    mensagem TEXT NOT NULL,
    tipo VARCHAR(30),
    origem_id INTEGER,
    resolvido BOOLEAN DEFAULT FALSE,
    bebida_id INTEGER,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_alertas_bebidas
        FOREIGN KEY (bebida_id)
        REFERENCES bebidas(id)
);

INSERT INTO categorias (nome)
VALUES
    ('Cerveja'),
    ('Destilados'),
    ('Energético'),
    ('Refrigerante'),
    ('Água')
ON CONFLICT (nome) DO NOTHING;

INSERT INTO usuarios (nome, email, senha)
VALUES
    ('Administrador', 'admin@stockbeer.com', '123456')
ON CONFLICT (email) DO NOTHING;

CREATE TABLE IF NOT EXISTS recuperacao_senha (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expira_em TIMESTAMP NOT NULL,
    utilizado BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_recuperacao_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
);