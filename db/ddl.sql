CREATE TABLE IF NOT EXISTS 
    public.material (
        id serial4 NOT NULL,
        name varchar NULL,
        image_storage_url varchar NULL,
        is_active bool DEFAULT TRUE NULL,
        created_at timestamptz DEFAULT current_timestamp,
        CONSTRAINT material_pk PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS 
    public.color (
        id serial4 NOT NULL,
        name varchar NULL,
        hex_code varchar NULL,
        is_active bool DEFAULT TRUE NULL,
        created_at timestamptz DEFAULT current_timestamp,
        CONSTRAINT color_pk PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS 
    public.rabbet (
        id serial4 NOT NULL,
        name varchar NULL,
        size varchar NULL,
        is_active bool DEFAULT TRUE NULL,
        created_at timestamptz DEFAULT current_timestamp,
        CONSTRAINT rabbet_pk PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS 
    public.style (
        id serial4 NOT NULL,
        name varchar NULL,
        storage_image_url varchar NULL,
        is_active bool DEFAULT TRUE NULL,
        created_at timestamptz DEFAULT current_timestamp,
        CONSTRAINT style_pk PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS 
    public.frame (
        id serial4 NOT NULL,
        name varchar NULL,
        description varchar NULL,
        storage_image_pattern_url varchar NULL,
        storage_image_design_url varchar NULL,
        storage_image_top_url varchar NULL,
        storage_image_side_url varchar NULL,
        storage_image_full_url varchar NULL,
        rabbet_id INT NULL,
        color_id INT NULL,
        material_id INT NULL,
        style_id INT NULL,
        is_active bool DEFAULT TRUE NULL,
        created_at timestamptz DEFAULT current_timestamp,
        CONSTRAINT frame_pk PRIMARY KEY (id),
        CONSTRAINT fk_frame_rabbet FOREIGN KEY (rabbet_id) REFERENCES rabbet (id),
        CONSTRAINT fk_frame_color FOREIGN KEY (color_id) REFERENCES color (id),
        CONSTRAINT fk_frame_material FOREIGN KEY (material_id) REFERENCES material (id),
        CONSTRAINT fk_frame_style FOREIGN KEY (style_id) REFERENCES style (id)
    );

CREATE TABLE IF NOT EXISTS 
    public.interior (
        id serial4 NOT NULL,
        name varchar NULL,
        description varchar NULL,
        storage_image_url varchar NULL,
        width varchar NULL,
        height varchar NULL,
        is_active bool DEFAULT TRUE NULL,
        created_at timestamptz DEFAULT current_timestamp,
        CONSTRAINT interior_pk PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS 
    public.simulation (
        id text NOT NULL DEFAULT generate_sim_id(),
        frame_id INT NULL,
        interior_id INT NULL,
        storage_image_artwork_url varchar NULL,
        storage_image_qr_code varchar NULL,
        matboard boolean NULL,
        size varchar NULL,
        created_at timestamptz DEFAULT current_timestamp,
        CONSTRAINT simulation_pk PRIMARY KEY (id),
        CONSTRAINT fk_sim_frame FOREIGN KEY (frame_id) REFERENCES frame(id)
        CONSTRAINT fk_sim_int FOREIGN KEY (interior_id) REFERENCES interior(id)
);