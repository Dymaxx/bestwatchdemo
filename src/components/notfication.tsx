import { faker } from "@faker-js/faker";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";

export function Noti() {
  return (
    <div className='text-white text-xs flex gap-2'>
      <Avatar className='w-8 h-8'>
        <AvatarImage src={faker.image.avatar()} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        {faker.person.firstName()}
        <p> commented </p>
      </div>
    </div>
  );
}
