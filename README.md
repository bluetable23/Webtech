
Sie sind Mitarbeiter einer Arztvermittlungsagentur, dazu müssen sie alle Mediziner in einer lokalen Datenbank speichern, sowiel regelmäßig Informationen updaten und einpflegen

Zu beginn müssen sie sich mit ihren Zugangsdaten einloggen


![Model](https://github.com/bluetable23/Webtech/blob/master/b1.png)


sie können ihr Passwort ausblenden, und wenn sie ihre Daten nicht richtig eingeben, erscheint eine Meldung
![Model](https://github.com/bluetable23/Webtech/blob/master/b2.png)
![Model](https://github.com/bluetable23/Webtech/blob/master/b3.png)

wenn sie erforderte Felder leer lassen erscheint eine Warnung

Admins ermöglichen die Zuweisung von Login daten (es gibt entweder Users oder Admins)
Erst nach dem Login erscheint das menü und die Überschrift

![Model](https://github.com/bluetable23/Webtech/blob/master/b4.png)

Links oben befindet sich das Menü, Ärzteverwaltung ist die List, Arzt hinzufügen und Adminverwaltung nur für Admins. Rechts ist der Logout button

Wenn ich auf den bearbeiten Button klicke erscheinen die Informationen des Arztes und ich kann die Einträge verändern und aktualisieren oder abrechen

![Model](https://github.com/bluetable23/Webtech/blob/master/b5.png)

Bei klick auf Aktualisierung kommt eine Bestätigung und ich Lande wieder auf der Liste

![Model](https://github.com/bluetable23/Webtech/blob/master/b6.png)

Beim Löschen erhalte ich auch eine Bestätigung


Bei Arzt hinzufügen kann ich neue Ärtze einfügen, hier eerscheint auch eine Warnung wenn ich bereiche leer lasse oder wenn die KK- Nummer keine 8 Zahlen hat oder wenn in der Telefnr keine Zahlen sind

![Model](https://github.com/bluetable23/Webtech/blob/master/b7.png)

![Model](https://github.com/bluetable23/Webtech/blob/master/b8.png)

Bei erfolgreicher Registrierung erscheint eine Bestätigung und ein neuer Arzt mit zufällig ausgewähltem Bild erscheint in der Liste

![Model](https://github.com/bluetable23/Webtech/blob/master/b9.png)


In der Adminverwaltung kann ich bestehende Nutzer verwalten oder neue hinzufügen
Nutzer Registrierung und Rollenvergabe 

![Model](https://github.com/bluetable23/Webtech/blob/master/b10.png)

Prüft on Passwort anforderung erfüllt, E mail 
Bei erolgreicher resgistrierung erschein bestätigung oder „Nicht möglich“
Liste mit Rollen und Löschoption
Passwörter werden gehasht gespeichert

![Model](https://github.com/bluetable23/Webtech/blob/master/b11.png)
-- Table: public.doctors

-- DROP TABLE IF EXISTS public.doctors;

CREATE TABLE IF NOT EXISTS public.doctors
(
    arztnr character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 10000000,
    fullname character varying COLLATE pg_catalog."default",
    strasnr character varying COLLATE pg_catalog."default",
    telenr character varying COLLATE pg_catalog."default",
    sprechzeiten character varying COLLATE pg_catalog."default",
    CONSTRAINT doctors_pkey PRIMARY KEY (arztnr)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.doctors
    OWNER to postgres;

-- Trigger: set_arztnr_trigger

-- DROP TRIGGER IF EXISTS set_arztnr_trigger ON public.doctors;

CREATE TRIGGER set_arztnr_trigger
    BEFORE INSERT
    ON public.doctors
    FOR EACH ROW
    WHEN (new.arztnr IS NULL)
    EXECUTE FUNCTION public.set_arztnr();

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    usernamea character varying COLLATE pg_catalog."default",
    passworda character varying COLLATE pg_catalog."default",
    emaila character varying COLLATE pg_catalog."default",
    rolea character varying COLLATE pg_catalog."default",
    ida integer NOT NULL DEFAULT nextval('users_ida_seq'::regclass),
    CONSTRAINT users_pkey PRIMARY KEY (ida)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

"arztnr","fullname","strasnr","telenr","sprechzeiten"
"43252313","Dr. Julia Becker","Lindenallee 15, 10587 Berlin","+4915212345678","Dienstag bis Samstag: 8:00 - 12:00 Uhr & 14:00 - 18:00 Uhr, Sonntag: Geschlossen"
"54367892","Dr. med. Nzimegne Nguénang ","Herrmannstraße 102, 1234 Berlin","+49306257076","Montag bis Sonntag: 8:00 - 12:00 Uhr & 14:00 - 18:00 Uhr"
"43252319","Dr. Alexander Müller","Eichenweg 5, 10789 Berlin","+4919012345678","Sonntag bis Donnerstag: 8:00 - 12:00 Uhr & 14:00 - 18:00 Uhr, Freitag: Geschlossen"
"64637485","Dr. Amira Al-Mansour ","Rosenstraße 17, 10178 Berlin	","+4917512345678","Freitag bis Dienstag: 8:00 - 12:00 Uhr & 14:00 - 18:00 Uhr, Mittwoch: Geschlossen"
"75481746","Dr. Ali Hassan","Akazienweg 3, 10965 Berlin","+4916812345678","Freitag bis Dienstag: 8:00 - 12:00 Uhr & 14:00 - 18:00 Uhr, Mittwoch: Geschlossen"
"87654398","Dr. Sophie Richter","Ulmenweg 20, 10827 Berlin","+4919312345678","Mittwoch bis Sonntag: 8:00 - 12:00 Uhr & 14:00 - 18:00 Uhr, Montag: Geschlossen"
"43252315","Dr. Sergio Fernandez","Birkenweg 7, 10963 Berlin","+4917612345678","Donnerstag bis Montag: 8:00 - 12:00 Uhr & 14:00 - 18:00 Uhr"
"73824815","Dr. Muhammad Al-Mansour","Rosenstraße 17, 10178 Berlin","+4917512345678","Mittwoch bis Sonntag: 8:00 - 12:00 Uhr & 14:00 - 18:00 Uhr, Montag: Geschlossen"
"43252312","Dr Marlies Müller","Schwedenweg 8, 12935 Berlin","+4917612345678","Mo-Fr: 8:00-12:00 Uhr & 14:00-18:00 Uhr
Sa: 9:00-12:00 Uhr (nach Vereinbarung)
So: Geschlossen"



"usernamea","passworda","emaila","rolea","ida"
"Anna","$2b$10$223/io8DMzzJon/fz6PWOO3y0YVsGDYQ4wziJGnopagEH6E.aMzu.","Anna@web.de","admin",51
"Anna","$2b$10$4RAqhWcBizsDrEVYo79l5e.Qnbl1COMxlQafkZIkrdm1OP1tlWTT6","fgzwdgwad@fma.com","user",54
"Anna","$2b$10$uWxcy/JQR7ZMa2jaAHlOtukAkrRp2flwsAjowQAJkd10z6.igenxe","esfedfew@web.de","admin",55
"Anna22","$2b$10$iuFMd73sugcwfr28S6IPpueoOl41UyIoXdYD9fS1kf7d8jA02HHuS","esfedfew@web.de","user",56



