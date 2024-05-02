import { type ConnectedProps, connect } from "react-redux";
import { type FETCH_STATUS } from "~/enums/common";
import { teamsOperations, teamsSelectors } from "~/lib/features/teams";
import { type AppStore } from "~/lib/store";
import { type Team } from "~/types/teams";

interface StateProps {
  fetchTeamsStatus: FETCH_STATUS;
  teams: Team[];
}

const mapStateToProps = (state: AppStore): StateProps => ({
  fetchTeamsStatus: teamsSelectors.fetchTeamsStatus(state),
  teams: teamsSelectors.teams(state),
});

interface DispatchProps {
  fetchTeams(): void;
}

const mapDispatchToProps: DispatchProps = {
  fetchTeams: teamsOperations.fetchTeams,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props = ConnectedProps<typeof connector>;

export default connector;
