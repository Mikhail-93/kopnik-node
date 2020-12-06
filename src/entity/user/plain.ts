import {User} from "@entity/user/User.entity";

export default function (user: User, options: { isCurrentUser?: boolean, isForeman?: boolean, isSubordinate?: boolean, isWitness?: boolean, isSubordinateRequest?: boolean } = {}) {
  const result = {
    id: user.id,
    locale: user.locale,
    firstName: user.firstName,
    lastName: user.lastName,
    patronymic: user.patronymic,
    photo: user.photo,
    location: {lat: user.latitude, lng: user.longitude},
    birthYear: user.birthYear,
    isWitness: user.isWitness,
    status: user.status,

    passport: user.passport,
    witness_id: user.witness?.id,
    foremanRequest_id: user.foremanRequest?.id,
    foreman_id: user.foreman?.id,
    subordinates: user.subordinates?.map(eachSubordinate => eachSubordinate.id),
    foremanRequests: user.foremanRequests?.map(eachSubordinateRequest => eachSubordinateRequest.id),
    witnessRequests: user.witnessRequests?.map(eachWitnessRequest => eachWitnessRequest.id),

    witnessChatId: user.witnessChatId,
    witnessChatInviteLink: user.witnessChatInviteLink,
    tenChatId: user.tenChatId,
    tenChatInviteLink: user.tenChatInviteLink,
  }
  // passport
  if (!options.isCurrentUser && !options.isWitness) {
    delete result.passport
  }
  // witness
  if (!options.isCurrentUser && !options.isWitness) {
    delete result.witness_id
  }
  // foremanRequest
  if (!options.isCurrentUser && !options.isSubordinateRequest) {
    delete result.foremanRequest_id
  }
  // foremanRequests
  if (!options.isCurrentUser) {
    delete result.foremanRequests
  }
  // witnessRequests
  if (!options.isCurrentUser) {
    delete result.witnessRequests
  }

  // witnessChatId? witnessChatInviteLink
  if (!options.isCurrentUser && !options.isWitness) {
    delete user.witnessChatId
    delete user.witnessChatInviteLink
  }

  //   tenChatId, tenChatInviteLink
  if (!options.isCurrentUser && !options.isSubordinate) {
    delete user.tenChatId
    delete user.tenChatInviteLink
  }

  return result
}