import { TeamForm } from '../components/TeamForm';

export function UpdateTeam(): JSX.Element {
  return (
    <section className="pt-28">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white" data-cy="update-team-title">
          Update team
        </h2>
        <TeamForm />
      </div>
    </section>
  );
}
