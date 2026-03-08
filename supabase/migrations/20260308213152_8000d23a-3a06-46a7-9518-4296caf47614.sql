
UPDATE exercises 
SET content = jsonb_set(content, '{audio_file}', '"SET1_Teil1.mp3"')
WHERE id = '4b5856ee-b8be-42aa-9d83-31044ea3f998';

UPDATE exercises 
SET content = jsonb_set(content, '{audio_file}', '"SET1_Teil3.mp3"')
WHERE id = 'd15eb834-b774-4751-8aba-3e1ee9fe2f92';
