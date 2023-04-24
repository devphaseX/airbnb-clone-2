type OmitServerGenData<Shape, Props extends keyof Shape = never> = {
  [K in keyof Shape as K extends ServerDateField | Props ? never : K]: Shape[K];
};

type MakeRecordValueTypeUnknown<Record> = {
  [K in keyof Record]: unknown;
};

type ServerDateField = 'createdAt' | 'updatedAt';

type UserServerFields = 'id' | 'emailVerified' | 'hashedPassword';
type ListServerFields = 'id' | 'userId';
