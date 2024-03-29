CREATE OR REPLACE FUNCTION public.generate_sim_id ()
    RETURNS character varying
    LANGUAGE plpgsql
    AS $function$
BEGIN
    PERFORM
        public.if_no_running_then_create ();
    PERFORM
        public.reset_sequence_if_first_of_day ();
    RETURN (('SIM'::text || TO_CHAR((CURRENT_DATE)::timestamp WITH TIME ZONE, 'YYYYMMDD'::text))  || '-' || LPAD((NEXTVAL('running'::regclass))::text, 4, '0'::text));
END;
$function$;

CREATE OR REPLACE FUNCTION public.if_no_running_then_create ()
    RETURNS void
    LANGUAGE plpgsql
    AS $function$
DECLARE
    seq_exists boolean;
BEGIN
    SELECT
        EXISTS (
            SELECT
                1
            FROM
                pg_catalog.pg_class
            WHERE
                relname = 'running'
                AND relkind = 'S') INTO seq_exists;
    IF NOT seq_exists THEN
        EXECUTE 'CREATE SEQUENCE running START 1';
    END IF;
END;
$function$;

CREATE OR REPLACE FUNCTION public.reset_sequence_if_first_of_day ()
    RETURNS void
    LANGUAGE plpgsql
    AS $function$
BEGIN
    IF NOT EXISTS (
        SELECT
            1
        FROM
            public.simulation
        WHERE
            date_trunc('day', created_at) = date_trunc('day', CURRENT_TIMESTAMP)) THEN
    -- Reset the sequence to 1
    EXECUTE format('ALTER SEQUENCE running RESTART WITH 1');
END IF;
END;
$function$;