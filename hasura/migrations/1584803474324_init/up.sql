CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.builds (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    dependencies jsonb,
    status text DEFAULT 'INIT'::text NOT NULL
);
CREATE SEQUENCE public.builds_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.builds_id_seq OWNED BY public.builds.id;
CREATE TABLE public.builds_statuses (
    value text NOT NULL,
    description text NOT NULL
);
-- Insert builds_statuses enums
INSERT INTO builds_statuses (value, description) VALUES ('INIT', 'This default state of the build, when it has been first created.'), ('RECIEVED', 'The event has been recieved by the worker'), ('COMPLETED', 'The build has completed.'), ('ERROR', 'There was an issue with the build');
ALTER TABLE ONLY public.builds ALTER COLUMN id SET DEFAULT nextval('public.builds_id_seq'::regclass);
ALTER TABLE ONLY public.builds
    ADD CONSTRAINT builds_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.builds_statuses
    ADD CONSTRAINT builds_statuses_pkey PRIMARY KEY (value);
CREATE TRIGGER set_public_builds_updated_at BEFORE UPDATE ON public.builds FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_builds_updated_at ON public.builds IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.builds
    ADD CONSTRAINT builds_status_fkey FOREIGN KEY (status) REFERENCES public.builds_statuses(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
