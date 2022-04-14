import { logging, PersistentMap } from 'near-sdk-as'

const CandidateUrl = new PersistentMap<string, string>("CandidateUrl");
const CandidateList = new PersistentMap<string, string[]>("Candidate list");
const VoteArray = new PersistentMap<string, i32[]>("Votes");
const UserParticipation= new PersistentMap<string, string[]>("Participants");
const PromptArray = new PersistentMap<string, string[]>("Prompts");

// view methods

export function getUrl(name:string):string {
  if(CandidateUrl.contains(name)) {
    return CandidateUrl.getSome(name)
  }
  else{
    logging.log('Can\'t find '+name)
    return ''
  }
}

export function getCandidates(prompt:string):string[] {
  if(CandidateList.contains(prompt)) {
    return CandidateList.getSome(prompt)
  }
  else{
    logging.log('Can\'t find '+ prompt)
    return []
  }
}

export function getVotes(prompt:string):i32[]{
  if(VoteArray.contains(prompt)){
    return VoteArray.getSome(prompt)
  }else{
    logging.log('prompt not found for this vote')
    return []
  }
}

export function hasVoted(prompt:string, user:string): bool {
  if(UserParticipation.contains(prompt)) {
    let __userParticipation = UserParticipation.getSome(prompt)
    return __userParticipation.includes(user)
  }else {
    logging.log('prompt not found')
    return false
  }
}

export function getAllPrompts():string[]{
  if(PromptArray.contains('AllArrays')){
    return PromptArray.getSome("AllArrays")
  }else{
    logging.log('no prompts found');
    return []
  }
}


// change methods

export function addUrl(name:string, url:string): void {
  CandidateUrl.set(name, url)
  logging.log('added url for ' + name)
}

export function setCandidates(prompt:string, candidates:string[]): void {
  CandidateList.set(prompt, candidates)
  VoteArray.set(prompt, new Array<i32>(candidates.length).fill(0))
  logging.log('added candidates for' + prompt)
}

export function addCandidate(prompt:string, candidate:string): void {
  if(CandidateList.contains(prompt)) {
    let current_candidates: string[] = CandidateList.getSome(prompt)
    if(!current_candidates.includes(candidate)){
      
      current_candidates.push(candidate)
      CandidateList.set(prompt, current_candidates)
      
      let __voteArray =  VoteArray.getSome(prompt)
      __voteArray.push(0)
      VoteArray.set(prompt, __voteArray)

      logging.log('added ' + candidate + ' to ' + prompt)
    }
    else {
      logging.log(candidate + ' already exists in this poll')
    }
  }
  else {
    CandidateList.set(prompt, [candidate])
    VoteArray.set(prompt, [0])
  }
}

export function addToPromptArray(prompt:string):void{
  logging.log('added to prompt array')
  if(PromptArray.contains("AllArrays")){
    logging.log('add addition to prompt array')
    let tempArray=PromptArray.getSome("AllArrays")
    tempArray.push(prompt)
    PromptArray.set("AllArrays",tempArray);
  }else{
    PromptArray.set("AllArrays",[prompt])
  }
}

export function clearPromptArray():void{
  logging.log('clearing prompt array');
  PromptArray.delete("AllArrays")
}


export function addVote(prompt:string, name:string): void {
  if(VoteArray.contains(prompt) && CandidateList.getSome(prompt).includes(name)) {
    let index = CandidateList.getSome(prompt).indexOf(name)
    let __voteArray: i32[] = VoteArray.getSome(prompt)
    __voteArray[index] += 1

    VoteArray.set(prompt, __voteArray)
  }
  else {
    logging.log('prompt or candidate doesn\'t exist')
  }
}

export function recordUser(prompt:string, user:string): void{
  if(UserParticipation.contains(prompt)) {
    let __userParticipation = UserParticipation.getSome(prompt)
    __userParticipation.push(user)

    UserParticipation.set(prompt, __userParticipation)
  }
  else {
    UserParticipation.set(prompt, [user])
  }
}