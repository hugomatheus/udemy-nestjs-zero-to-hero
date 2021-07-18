import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

import { cpf } from 'cpf-cnpj-validator';

interface IObject {
  constructor: any;
}

export function IsCPF(property: string, validationOptions?: ValidationOptions) {
  return function (object: IObject, propertyName: string) {
    registerDecorator({
      name: 'IsCPF',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return cpf.isValid(value);
        },
      },
    });
  };
}
